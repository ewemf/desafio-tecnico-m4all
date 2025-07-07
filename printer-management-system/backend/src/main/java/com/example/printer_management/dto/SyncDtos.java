package com.example.printer_management.dto;


public final class SyncDtos {
    
    private SyncDtos() {}

    public static class StatusReport {
        private final String currentStatus;
        private final Integer paperLevel;

        public StatusReport(String currentStatus, Integer paperLevel) {
            this.currentStatus = currentStatus;
            this.paperLevel = paperLevel;
        }

        public String getCurrentStatus() { return currentStatus; }
        public Integer getPaperLevel() { return paperLevel; }
    }
}