package com.example.printer_management.service;

import com.example.printer_management.dto.SyncDtos;
import com.example.printer_management.model.Printer;
import com.example.printer_management.repository.PrinterRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class PrinterSyncService implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(PrinterSyncService.class);
    private final WebClient webClient;
    private final PrinterRepository printerRepository;
    private SyncDtos.SyncStats lastSyncStats;

    @Autowired
    public PrinterSyncService(PrinterRepository printerRepository) {
        this.printerRepository = printerRepository;
        this.webClient = WebClient.builder().baseUrl("https://mt.tracerly.net").build();
    }

    @Override
    public void run(String... args) {
        log.info("Executando sincronização inicial na inicialização do sistema...");
        sincronizarImpressoras();
    }

    public void sincronizarImpressoras() {
        log.info("Iniciando busca de dados da API externa: https://mt.tracerly.net");

        AtomicInteger totalProcessados = new AtomicInteger(0);
        AtomicInteger criados = new AtomicInteger(0);
        AtomicInteger atualizados = new AtomicInteger(0);
        AtomicInteger falhas = new AtomicInteger(0);

        webClient.get()
                .retrieve()
                .bodyToMono(SyncDtos.ExternalApiResponse.class)
                .doOnError(error -> log.error("Falha ao se comunicar com a API externa: {}", error.getMessage()))
                .flatMapIterable(response -> response.getPrinters() != null ? response.getPrinters() : Collections.emptyList())
                .flatMap(dto -> salvarOuAtualizarImpressoraReactive(dto)
                        .doOnSuccess(isNew -> {
                            if (isNew) {
                                criados.incrementAndGet();
                            } else {
                                atualizados.incrementAndGet();
                            }
                            totalProcessados.incrementAndGet();
                        })
                        .doOnError(e -> {
                            falhas.incrementAndGet();
                            log.error("Erro ao processar a impressora com ID [{}]: {}", dto.getId(), e.getMessage());
                        })
                        .onErrorResume(e -> Mono.empty())
                )
                .then()
                .subscribe(
                    null,
                    error -> {
                        log.error("Erro catastrófico durante a sincronização: {}", error.getMessage());
                        this.lastSyncStats = new SyncDtos.SyncStats(totalProcessados.get() + falhas.get(), criados.get(), atualizados.get(), OffsetDateTime.now());
                        log.info("Sincronização concluída (com erros). Total: {}, Criados: {}, Atualizados: {}, Falhas: {}",
                                totalProcessados.get() + falhas.get(), criados.get(), atualizados.get(), falhas.get());
                    },
                    () -> {
                        this.lastSyncStats = new SyncDtos.SyncStats(totalProcessados.get() + falhas.get(), criados.get(), atualizados.get(), OffsetDateTime.now());
                        log.info("Sincronização concluída. Total: {}, Criados: {}, Atualizados: {}, Falhas: {}",
                                totalProcessados.get() + falhas.get(), criados.get(), atualizados.get(), falhas.get());
                    }
                );
    }

    @Transactional
    public Mono<Boolean> salvarOuAtualizarImpressoraReactive(SyncDtos.ExternalPrinterData payload) {
        if (payload.getId() == null) {
            return Mono.error(new IllegalArgumentException("Registro com ID nulo recebido."));
        }

        return Mono.fromCallable(() -> {
            return printerRepository.findById(payload.getId()).map(existingPrinter -> {
                existingPrinter.setName(payload.getName());
                existingPrinter.setModel(payload.getModel());
                existingPrinter.setLocation(payload.getLocation());
                existingPrinter.setStatus(payload.getStatus());
                existingPrinter.setPaperCapacity(payload.getPaperCapacity());
                printerRepository.save(existingPrinter);
                return false;
            }).orElseGet(() -> {
                Printer novaImpressora = new Printer();
                novaImpressora.setId(payload.getId());
                novaImpressora.setName(payload.getName());
                novaImpressora.setModel(payload.getModel());
                novaImpressora.setLocation(payload.getLocation());
                novaImpressora.setStatus(payload.getStatus());
                novaImpressora.setPaperCapacity(payload.getPaperCapacity());
                novaImpressora.setCreatedAt(payload.getCreatedAt() != null ? payload.getCreatedAt() : OffsetDateTime.now()); // Garante createdAt
                printerRepository.save(novaImpressora);
                return true;
            });
        }).onErrorMap(e -> {
            log.error("Erro transacional ao salvar/atualizar ID [{}]: {}", payload.getId(), e.getMessage());
            return new RuntimeException("Falha ao salvar/atualizar impressora " + payload.getId(), e);
        });
    }

    @Scheduled(fixedRate = 3600000)
    public void executarSincronizacaoAgendada() {
        log.info("Disparando sincronização agendada periódica...");
        sincronizarImpressoras();
    }

    public SyncDtos.SyncStats getUltimasEstatisticas() {
        return this.lastSyncStats;
    }
}