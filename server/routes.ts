import type { Express } from "express";
import { createServer, type Server } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";

export async function registerRoutes(app: Express): Promise<Server> {
  const { storage } = await import("./storage-db");
  const { seedDatabase } = await import("./seed");
  
  // Initialize database with sample data
  await seedDatabase();
  
  // Authentication endpoints
  app.post("/api/auth/pegawai/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const pegawai = await storage.getPegawaiByEmail(email);
      
      if (!pegawai) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // In production, you'd verify the password hash
      // For now, accepting any password for demo purposes
      let role = pegawai.jabatan.toLowerCase().replace(/\s+/g, '_');
      if (role === 'administrator') role = 'admin';
      if (role === 'customer_service') role = 'cs';
      if (role === 'pegawai_gudang') role = 'pegawai_gudang';
      
      const authUser = {
        id: pegawai.id,
        email: pegawai.email,
        name: pegawai.nama_pegawai,
        role: role as any,
        token: 'demo-token-' + pegawai.id
      };
      
      res.json({ data: authUser });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/pembeli/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const pembeli = await storage.getPembeliByEmail(email);
      
      if (!pembeli) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const authUser = {
        id: pembeli.id,
        email: pembeli.email,
        name: pembeli.nama_pembeli,
        role: 'pembeli' as any,
        token: 'demo-token-' + pembeli.id
      };
      
      res.json({ data: authUser });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/organisasi/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const organisasi = await storage.getOrganisasiByEmail(email);
      
      if (!organisasi) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const authUser = {
        id: organisasi.id,
        email: organisasi.email,
        name: organisasi.nama_organisasi,
        role: 'organisasi' as any,
        token: 'demo-token-' + organisasi.id
      };
      
      res.json({ data: authUser });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    res.json({ message: "Logged out successfully" });
  });

  // Merchandise endpoints
  app.get("/api/merch", async (req, res) => {
    try {
      const merch = await storage.getAllMerch();
      res.json({ data: merch });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch merchandise" });
    }
  });

  app.get("/api/merch/:id", async (req, res) => {
    try {
      const merch = await storage.getMerchById(parseInt(req.params.id));
      if (!merch) {
        return res.status(404).json({ error: "Merchandise not found" });
      }
      res.json({ data: merch });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch merchandise" });
    }
  });

  // Employee endpoints
  app.get("/api/pegawai", async (req, res) => {
    try {
      const pegawai = await storage.getAllPegawai();
      res.json({ data: pegawai });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employees" });
    }
  });

  // Purchase endpoints
  app.get("/api/pembelian", async (req, res) => {
    try {
      const pembelian = await storage.getAllPembelian();
      res.json({ data: pembelian });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch purchases" });
    }
  });

  // Complete CRUD for Merchandise
  app.post("/api/merch", async (req, res) => {
    try {
      const merch = await storage.createMerch(req.body);
      res.json({ data: merch });
    } catch (error) {
      res.status(500).json({ error: "Failed to create merchandise" });
    }
  });

  app.put("/api/merch/:id", async (req, res) => {
    try {
      const merch = await storage.updateMerch(parseInt(req.params.id), req.body);
      res.json({ data: merch });
    } catch (error) {
      res.status(500).json({ error: "Failed to update merchandise" });
    }
  });

  app.delete("/api/merch/:id", async (req, res) => {
    try {
      await storage.deleteMerch(parseInt(req.params.id));
      res.json({ message: "Merchandise deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete merchandise" });
    }
  });

  // Complete CRUD for Employees
  app.post("/api/pegawai", async (req, res) => {
    try {
      const pegawai = await storage.createPegawai(req.body);
      res.json({ data: pegawai });
    } catch (error) {
      res.status(500).json({ error: "Failed to create employee" });
    }
  });

  app.put("/api/pegawai/:id", async (req, res) => {
    try {
      const pegawai = await storage.updatePegawai(parseInt(req.params.id), req.body);
      res.json({ data: pegawai });
    } catch (error) {
      res.status(500).json({ error: "Failed to update employee" });
    }
  });

  app.delete("/api/pegawai/:id", async (req, res) => {
    try {
      await storage.deletePegawai(parseInt(req.params.id));
      res.json({ message: "Employee deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete employee" });
    }
  });

  // CRUD for Purchases
  app.post("/api/pembelian", async (req, res) => {
    try {
      const pembelian = await storage.createPembelian(req.body);
      res.json({ data: pembelian });
    } catch (error) {
      res.status(500).json({ error: "Failed to create purchase" });
    }
  });

  app.get("/api/pembelian/:id", async (req, res) => {
    try {
      const pembelian = await storage.getPembelianById(parseInt(req.params.id));
      if (!pembelian) {
        return res.status(404).json({ error: "Purchase not found" });
      }
      res.json({ data: pembelian });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch purchase" });
    }
  });

  // CRUD for Shipping
  app.get("/api/pengiriman", async (req, res) => {
    try {
      const pengiriman = await storage.getAllPengiriman();
      res.json({ data: pengiriman });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch shipments" });
    }
  });

  app.post("/api/pengiriman", async (req, res) => {
    try {
      const pengiriman = await storage.createPengiriman(req.body);
      res.json({ data: pengiriman });
    } catch (error) {
      res.status(500).json({ error: "Failed to create shipment" });
    }
  });

  app.get("/api/pengiriman/:id", async (req, res) => {
    try {
      const pengiriman = await storage.getPengirimanById(parseInt(req.params.id));
      if (!pengiriman) {
        return res.status(404).json({ error: "Shipment not found" });
      }
      res.json({ data: pengiriman });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch shipment" });
    }
  });

  // CRUD for Customer registration
  app.post("/api/auth/pembeli/register", async (req, res) => {
    try {
      const pembeli = await storage.createPembeli(req.body);
      const authUser = {
        id: pembeli.id,
        email: pembeli.email,
        name: pembeli.nama_pembeli,
        role: 'pembeli' as any,
        token: 'demo-token-' + pembeli.id
      };
      res.json({ data: authUser });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // CRUD for Organization registration
  app.post("/api/auth/organisasi/register", async (req, res) => {
    try {
      const organisasi = await storage.createOrganisasi(req.body);
      const authUser = {
        id: organisasi.id,
        email: organisasi.email,
        name: organisasi.nama_organisasi,
        role: 'organisasi' as any,
        token: 'demo-token-' + organisasi.id
      };
      res.json({ data: authUser });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
