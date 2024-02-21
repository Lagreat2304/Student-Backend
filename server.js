const express = require("express");
const cors = require("cors");
const dbOperation = require("./dbFiles/dbOperations");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.delete('/deleteStudent/:id', async (req, res) => {
    try {
        const Reg = req.params.id;
        await dbOperation.deleteStudent(Reg);
        const result = await dbOperation.getstudent(Reg);
        res.send(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.put('/studentupdate/:id', async (req, res) => {
    try {
        const Reg = req.params.id;
        await dbOperation.updatestudent(Reg, req.body);
        const result = await dbOperation.getstudent(Reg);
        res.send(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/studentsearch', async(req,res) => {
    console.log('called');
    const result = await dbOperation.getstudent(req.body.name);
    res.send(result.recordset);
});

app.post('/addStudent',async(req,res) => {
    await dbOperation.addStudent(req.body);
    const result = await dbOperation.getstudent(req.body.Reg);
    res.send(result.recordset);
})
const port = 5000;
app.listen(port,()=> console.log("Running"));