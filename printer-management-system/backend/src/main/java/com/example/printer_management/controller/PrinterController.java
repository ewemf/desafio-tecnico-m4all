package com.example.printer_management.controller;

import com.example.printer_management.model.Printer;
import com.example.printer_management.service.PrinterService;
import com.example.printer_management.dto.SyncDtos.StatusReport;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/printers")
public class PrinterController {

    private final PrinterService printerService;

    public PrinterController(PrinterService printerService) {
        this.printerService = printerService;
    }

    @GetMapping
    public ResponseEntity<List<Printer>> getAllPrinters() {
        List<Printer> todasImpressoras = printerService.listarImpressoras();
        return ResponseEntity.ok(todasImpressoras);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Printer> getPrinterById(@PathVariable UUID id) {
        return printerService.encontrarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Printer> createPrinter(@RequestBody Printer printer) {
        Printer impressoraSalva = printerService.registrarImpressora(printer);
        return ResponseEntity.status(HttpStatus.CREATED).body(impressoraSalva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Printer> updatePrinter(@PathVariable UUID id, @RequestBody Printer printerDetails) {
        try {
            Printer impressoraAtualizada = printerService.atualizarDados(id, printerDetails);
            return ResponseEntity.ok(impressoraAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrinter(@PathVariable UUID id) {
        try {
            printerService.removerImpressora(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<StatusReport> getPrinterStatus(@PathVariable UUID id) {
        return printerService.encontrarPorId(id).map(printer -> {
            StatusReport report = new StatusReport(
                    printer.getStatus().toString(),
                    printer.getPaperCapacity()
            );
            return ResponseEntity.ok(report);
        }).orElse(ResponseEntity.notFound().build());
    }
}