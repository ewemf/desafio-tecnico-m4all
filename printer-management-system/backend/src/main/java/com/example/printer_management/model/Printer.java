package com.example.printer_management.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.OffsetDateTime;
import java.util.UUID;
import jakarta.persistence.Column;

@Entity
@Data
public class Printer {

    public enum PrinterStatus {
        ONLINE,
        OFFLINE
    }

    @Id
    @Column(columnDefinition = "char(36)")
    private UUID id;

    private String name;
    private String model;
    private String location;

    @Enumerated(EnumType.STRING)
    private PrinterStatus status;

    private Integer paperCapacity;

    @Column(updatable = false)
    private OffsetDateTime createdAt;

    @Version
    private Long version;
}