package com.example.printer_management.dto;

import com.example.printer_management.model.Printer.PrinterStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public final class SyncDtos {

    private SyncDtos() {}

    @Data
    @NoArgsConstructor
    public static class ExternalPrinterData {
        private UUID id;
        private String name;
        private String model;
        private String location;
        private PrinterStatus status;
        private Integer paperCapacity;
        private OffsetDateTime createdAt;
    }

    @Data
    @NoArgsConstructor
    public static class ExternalApiResponse {
        @JsonProperty("data")
        private List<ExternalPrinterData> printers;
    }

    @Data
    @NoArgsConstructor
    public static class SyncStats {
        private int totalProcessed;
        private int created;
        private int updated;
        private OffsetDateTime timestamp;

        public SyncStats(int total, int created, int updated, OffsetDateTime ts) {
            this.totalProcessed = total;
            this.created = created;
            this.updated = updated;
            this.timestamp = ts;
        }
    }

    @Data
    @NoArgsConstructor
    public static class StatusReport {
        private String status;
        private Integer paperLevel;
        
        public StatusReport(String status, Integer level) {
            this.status = status;
            this.paperLevel = level;
        }
    }
}