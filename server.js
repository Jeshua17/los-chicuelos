const express = require('express');
const pool = require('./conexion');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(express.json());

// Ruta para obtener usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const [filas] = await pool.query('SELECT * FROM loggin');
        res.json(filas);
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para login (POST) CON LOGS
app.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;
    
    console.log('📧 Correo recibido:', correo);
    console.log('🔑 Contraseña recibida:', contraseña);
    
    try {
        const [usuarios] = await pool.query(
            'SELECT id_usuario, nombre_usuario, correo FROM loggin WHERE correo = ? AND contraseña = ?',
            [correo, contraseña]
        );
        
        console.log('👥 Usuarios encontrados:', usuarios.length);
        
        if (usuarios.length > 0) {
            console.log('✅ Actualizando último acceso para:', correo);
            await pool.query('UPDATE loggin SET ultimo_acceso = NOW() WHERE correo = ?', [correo]);
            
            console.log('🎉 Login exitoso para:', usuarios[0].nombre_usuario);
            
            res.json({ 
                success: true, 
                usuario: usuarios[0] 
            });
        } else {
            console.log('❌ Credenciales incorrectas para:', correo);
            res.status(401).json({ 
                success: false, 
                mensaje: 'Correo o contraseña incorrectos' 
            });
        }
    } catch (error) {
        console.error('❌ Error en login:', error);
        res.status(500).json({ 
            success: false, 
            mensaje: 'Error en el servidor' 
        });
    }
});

// Ruta para registrar nuevos usuarios
app.post('/registro', async (req, res) => {
    const { nombre_usuario, correo, contraseña } = req.body;

    console.log('📝 Registro - Nombre:', nombre_usuario);
    console.log('📧 Registro - Correo:', correo);

    if (!nombre_usuario || !correo || !contraseña) {
        console.log('❌ Faltan datos en registro');
        return res.status(400).json({ success: false, mensaje: 'Faltan datos' });
    }

    try {
        const [existe] = await pool.query('SELECT id_usuario FROM loggin WHERE correo = ?', [correo]);
        if (existe.length > 0) {
            console.log('❌ Correo ya registrado:', correo);
            return res.status(400).json({ success: false, mensaje: 'El correo ya está registrado' });
        }

        await pool.query(
            'INSERT INTO loggin (nombre_usuario, correo, contraseña, fecha_registro) VALUES (?, ?, ?, NOW())',
            [nombre_usuario, correo, contraseña]
        );

        console.log('✅ Usuario registrado exitosamente:', nombre_usuario);
        res.status(201).json({ success: true, mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('❌ Error en registro:', error);
        res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
    }
});

app.listen(3001, () => {
    console.log('✅ Servidor corriendo en http://localhost:3001');
});
// Ruta para obtener un usuario por ID
app.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [usuarios] = await pool.query('SELECT nombre_usuario, correo, fecha_registro, ultimo_acceso FROM loggin WHERE id_usuario = ?', [id]);
        if (usuarios.length > 0) {
            res.json(usuarios[0]);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener todas las ideas
app.get('/ideas', async (req, res) => {
    try {
        const [ideas] = await pool.query('SELECT * FROM ideas ORDER BY fecha_creacion DESC');
        res.json(ideas);
    } catch (error) {
        console.error('Error al obtener ideas:', error);
        res.status(500).json({ error: 'Error al obtener ideas' });
    }
});

// Ruta para publicar una nueva idea
app.post('/ideas', async (req, res) => {
    const { usuario, titulo, contenido } = req.body;

    if (!usuario || !titulo || !contenido) {
        return res.status(400).json({ success: false, mensaje: 'Faltan datos' });
    }

    try {
        await pool.query(
            'INSERT INTO ideas (usuario, titulo, contenido) VALUES (?, ?, ?)',
            [usuario, titulo, contenido]
        );
        res.status(201).json({ success: true, mensaje: 'Idea publicada correctamente' });
    } catch (error) {
        console.error('Error al publicar idea:', error);
        res.status(500).json({ success: false, mensaje: 'Error al publicar idea' });
    }
});

// Eliminar idea (solo el autor)
app.delete('/ideas/:id', async (req, res) => {
    const { id } = req.params;
    const { usuario } = req.body;

    try {
        const [idea] = await pool.query('SELECT usuario FROM ideas WHERE id_idea = ?', [id]);
        if (idea.length === 0) {
            return res.status(404).json({ success: false, mensaje: 'Idea no encontrada' });
        }
        if (idea[0].usuario !== usuario) {
            return res.status(403).json({ success: false, mensaje: 'No puedes eliminar esta idea' });
        }

        await pool.query('DELETE FROM ideas WHERE id_idea = ?', [id]);
        res.json({ success: true, mensaje: 'Idea eliminada' });
    } catch (error) {
        console.error('Error al eliminar idea:', error);
        res.status(500).json({ success: false, mensaje: 'Error al eliminar idea' });
    }
});

// Obtener respuestas de una idea
app.get('/respuestas/:id_idea', async (req, res) => {
    const { id_idea } = req.params;
    try {
        const [respuestas] = await pool.query('SELECT * FROM respuestas WHERE id_idea = ? ORDER BY fecha_respuesta ASC', [id_idea]);
        res.json(respuestas);
    } catch (error) {
        console.error('Error al obtener respuestas:', error);
        res.status(500).json({ error: 'Error al obtener respuestas' });
    }
});

// Publicar respuesta
app.post('/respuestas', async (req, res) => {
    const { id_idea, usuario, contenido } = req.body;

    if (!id_idea || !usuario || !contenido) {
        return res.status(400).json({ success: false, mensaje: 'Faltan datos' });
    }

    try {
        await pool.query(
            'INSERT INTO respuestas (id_idea, usuario, contenido) VALUES (?, ?, ?)',
            [id_idea, usuario, contenido]
        );
        res.status(201).json({ success: true, mensaje: 'Respuesta publicada' });
    } catch (error) {
        console.error('Error al publicar respuesta:', error);
        res.status(500).json({ success: false, mensaje: 'Error al publicar respuesta' });
    }
});