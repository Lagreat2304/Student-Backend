const Student = require("./Student");
require('dotenv').config();
var config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
      trustedconnection: false,
      enableArithAbort: true,
      trustServerCertificate: true,
      instancename: process.env.INSTANCE,
    },
    port: parseInt(process.env.PORT,10)
};

const sql = require("mssql");

const deleteStudent = async(Reg) => {
    try{
        let pool = await sql.connect(config);
        let student = await pool.request().query(`Delete from Students where Reg = '${Reg}'`);
        console.log(student);
        return student;
    }
    catch(error){
        console.log(error);
    }
}

const updatestudent = async (Reg, updatedData) => {
    try {
        let pool = await sql.connect(config);
        let students = await pool.request()
            .input('Name', sql.NVarChar, updatedData.Name)
            .input('DOB', sql.NVarChar, updatedData.DOB)
            .input('Department', sql.NVarChar, updatedData.Department)
            .input('GPA', sql.Float, updatedData.GPA)
            .input('Address', sql.NVarChar, updatedData.Address)
            .input('PhoneNo',sql.NVarChar, updatedData.PhoneNo)
            .input('Reg', sql.NVarChar, Reg)
            .query(`
                UPDATE Students 
                SET Name = @Name, 
                DOB = @DOB, 
                Department = @Department,
                GPA = @GPA,
                Address = @Address,
                PhoneNo = @PhoneNo
                WHERE Reg = @Reg`);
        console.log(students);
        return students;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


const addStudent = async(newstudent) => {
    try{
        let pool = await sql.connect(config);
        let students = await pool.request().query(`insert into Students Values ('${newstudent.Reg}', '${newstudent.Name}', '${newstudent.DOB}', '${newstudent.Department}', '${newstudent.GPA}','${newstudent.Address}', ${newstudent.PhoneNo})`);
        return students;
    }
    catch(error){
        console.log(error);
    }
}

const getstudent = async(Student) => {
    try{
        let pool = await sql.connect(config);
        let students =await pool.request().query(`SELECT * from Students`);
        console.log(students);
        return students;
    }
    catch(error){
        console.log(error);
    }
}
module.exports = {
    getstudent,
    addStudent,
    deleteStudent,
    updatestudent
}
