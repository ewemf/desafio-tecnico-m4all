package com.example.printer_management.service;

import com.example.printer_management.model.Printer;
import com.example.printer_management.repository.PrinterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PrinterService {

    private final PrinterRepository printerRepository;

    public PrinterService(PrinterRepository printerRepository) {
        this.printerRepository = printerRepository;
    }

    @Transactional(readOnly = true)
    public List<Printer> listarImpressoras() {
        return printerRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Printer> encontrarPorId(UUID id) {
        return printerRepository.findById(id);
    }

    @Transactional
    public Printer registrarImpressora(Printer printer) {
        printer.setId(UUID.randomUUID());
        printer.setCreatedAt(OffsetDateTime.now());
        return printerRepository.save(printer);
    }

    @Transactional
    public Printer atualizarDados(UUID id, Printer dadosImpressora) {
        Printer impressoraExistente = printerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Impressora não encontrada" + id));

        impressoraExistente.setName(dadosImpressora.getName());
        impressoraExistente.setModel(dadosImpressora.getModel());
        impressoraExistente.setLocation(dadosImpressora.getLocation());
        impressoraExistente.setStatus(dadosImpressora.getStatus());
        impressoraExistente.setPaperCapacity(dadosImpressora.getPaperCapacity());

        return printerRepository.save(impressoraExistente);
    }

    @Transactional
    public void removerImpressora(UUID id) {
        if (!printerRepository.existsById(id)) {
            throw new RuntimeException("Impressora não encontrada" + id);
        }
        printerRepository.deleteById(id);
    }
}