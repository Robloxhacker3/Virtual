const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to handle file uploads (ISO file)
const upload = multer({ dest: 'uploads/' });

// Placeholder for VM state
let vmStatus = 'stopped'; // VM can be "started", "stopped", or "running"

// Simulate VM configurations (disk size, RAM, ISO, UEFI Boot)
let vmConfig = {
    diskSize: 20,  // Default 20 GB
    ramSize: 4,    // Default 4 GB
    isoFile: null,
    uefiBoot: false
};

// Simulated API endpoints for managing VMs
app.post('/vm/start', upload.single('isoFile'), (req, res) => {
    // Parse the form data sent from the frontend
    vmConfig.diskSize = req.body.diskSize || 20;
    vmConfig.ramSize = req.body.ramSize || 4;
    vmConfig.uefiBoot = req.body.uefiBoot === 'on'; // UEFI boot toggle (on/off)
    if (req.file) {
        // Save the ISO file to the server (just a simulation)
        vmConfig.isoFile = req.file.path;
    }

    // Here you would integrate with actual VM software to create the VM with these settings
    // For example, passing these settings to a QEMU or VirtualBox script

    vmStatus = 'running';
    res.json({ status: vmStatus });
});

app.post('/vm/stop', (req, res) => {
    // Stop the VM (simulated)
    vmStatus = 'stopped';
    res.json({ status: vmStatus });
});

app.get('/vm/status', (req, res) => {
    // Return current VM status
    res.json({ status: vmStatus, config: vmConfig });
});

// Serve the frontend HTML
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
