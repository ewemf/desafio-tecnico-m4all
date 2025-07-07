package com.example.printer_management.controller;

import com.example.printer_management.dto.SyncDtos;
import com.example.printer_management.service.PrinterSyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/sync")
public class SyncController {

    private final PrinterSyncService printerSyncService;

    @Autowired
    public SyncController(PrinterSyncService printerSyncService) {
        this.printerSyncService = printerSyncService;
    }

    @GetMapping("/statistics")
    public ResponseEntity<SyncDtos.SyncStats> obterEstatisticasDeSincronizacao() {
        SyncDtos.SyncStats stats = printerSyncService.getUltimasEstatisticas();
        if (stats == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/trigger")
    public ResponseEntity<String> dispararSincronizacao() {
        printerSyncService.sincronizarImpressoras();
        return ResponseEntity.accepted().body("Processo de sincronização iniciado em segundo plano.");
    }
}