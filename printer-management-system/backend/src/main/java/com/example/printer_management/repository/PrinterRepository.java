package com.example.printer_management.repository;

import com.example.printer_management.model.Printer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface PrinterRepository extends JpaRepository<Printer, UUID> {
}