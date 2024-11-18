const { exec } = require('child_process');

app.post('/vm/start', upload.single('isoFile'), (req, res) => {
    // Parse VM settings from the request
    const diskSize = req.body.diskSize || 20;
    const ramSize = req.body.ramSize || 4;
    const uefiBoot = req.body.uefiBoot === 'on'; // Check UEFI boot toggle
    const isoFilePath = req.file ? req.file.path : null;

    // Start the VM with QEMU and VNC server
    const command = `qemu-system-x86_64 -hda /path/to/disk.img -cdrom ${isoFilePath} -m ${ramSize}G -vnc :1`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send('Failed to start VM');
            return;
        }

        console.log(`VM started: ${stdout}`);
        res.json({ status: 'running' });
    });
});
