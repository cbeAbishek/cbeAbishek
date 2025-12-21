const express = require('express');
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()
const port = process.env.PORT || 5000;

app.use(express.json())

async function showData() {
    const users = await prisma.user.findMany()
}

async function mannualData() {
    const data = await prisma.user.create({
        data: {
            name: "Abishek",
            email: "abi@gmail.com",
            Password: "123",
            // name: "Burger",
            // location: "New York",
            // description: "Delicious Burger",
            // type: "FF"
        }
    })
    console.log("Account created", data.name)
}

async function showparticularData() {
    const users = await prisma.user.findUnique({
        where: {
            email: "abi@gmail.com"
        }
    })
    console.log(users)
}

async function showparticularField() {
    const users = await prisma.user.findMany({
        where: {
            email: "abi@gmail.com"
        },
        select: {
            name: true,
            email: true
        }
    })
    console.log(users)
}

async function updateData() {
    const users = await prisma.user.update({
        where: {
            email: "abi@gmail.com"
        },
        data: {
            name: "Abishek"
        }
    })
    console.log(users)
}

async function deleteData() {
    const users = await prisma.user.delete({
        where: {
            email: "2"
        },
        select: {
            email: true
        }
    })
    console.log("Deleted Data", users.email)
}

//showData()
//mannualData()
//showparticularData()
//showparticularField()
//updateData()
//deleteData()

app.get("/", (req, res) => {
    res.send(`
        Hello World!<br>
        Status: 200<br>
        Uptime: ${process.uptime()}<br>
        Memory Usage: ${process.memoryUsage().heapUsed / 1024 / 1024}MB
    `);
});

app.post("/user", (req, res) => {
    try {
        const { name, email, Password } = req.body;
        const user = prisma.user.create({
            data: {
                name,
                email,
                Password
            }
        })
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

app.get("/user", (req, res) => {
    try {
        const users = prisma.user.findMany()
        res.send(users)
    } catch (e) {
        res.send(e)
    }
})

app.get("/user/:id", (req, res) => {
    try {
        const users = prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.send(users)
    } catch (e) {
        res.send(e)
    }
})

app.put("/user/:id", (req, res) => {
    try {
        const users = prisma.user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                Password: req.body.Password
            }
        })
        res.send(users)
    } catch (e) {
        res.send(e)
    }
})

app.delete("/user/:id", (req, res) => {
    try {
        const users = prisma.user.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.send(users)
    } catch (e) {
        res.send(e)
    }
})

app.post("/login", (req, res) => {
    try {
        const { email, Password } = req.body;
        const user = prisma.user.findUnique({
            where: {
                email: email
            }
        })
        res.send("Login Success")
    } catch (e) {
        res.send("Login Failed " + e)
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

