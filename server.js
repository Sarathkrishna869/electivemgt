console.log("bhavvuk script..");
const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "electivemgt@gmail.com",
    pass: "ejkvegvnikilxilj",
  },
});

app.use(express.static("public"));


app.use(express.json());

const { connectToDB, getDb } = require("./db");

let db;

connectToDB((err) => {
  if (!err) {
    app.listen(process.env.PORT, () => {
      console.log("Server is Running");
      console.log("Connected to Database");
      db = getDb();
    });
  }
});

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/src/pages/login.html");
  console.log("Sent file to User..");
});

// // Handling GET /hello request
app.get("/oes_admin", (req, res, next) => {
  res.sendFile(__dirname + "/src/offered_electives/oes_admin.html");
});

app.get("/oes_stu", (req, res, next) => {
  res.sendFile(__dirname + "/src/offered_electives/oes_stu.html");
});

app.get("/call_page", (req, res, next) => {
  res.sendFile(__dirname + "/src/pages/register.html");
});

app.get("/reg", (req, res, next) => {
  res.sendFile(__dirname + "/src/pages/newregister.html");
});

app.get("/fp", (req, res, next) => {
  res.sendFile(__dirname + "/src/pages/forgotpass.html");
});

app.get("/home", (req, res, next) => {
  res.sendFile(__dirname + "/src/pages/home.html");
});

app.post("/start_proc", (req,res)=>{
    const set_val = req.body.st
    console.log(set_val)
    db.collection("Registration_status")
    .updateOne( { }, { $set: { status: set_val } } )
    .then(()=>{
        res.status(200).json({user:"updated"})
    })
    .catch(()=>{
        res.status(500).json({error: "Could not fetch the document"})
    })

});

app.post("/publish_final_list", (req,res)=>{
    db.collection("Publish_status")
    .updateOne( { }, { $set: { status: "Yes" } } )
    .then(()=>{
        res.status(200).json({user:"updated"})
    })
    .catch(()=>{
        res.status(500).json({error: "Could not fetch the document"})
    })

});

app.post("/unpublish_final_list", (req,res)=>{
    db.collection("Publish_status")
    .updateOne( { }, { $set: { status: "No" } } )
    .then(()=>{
        res.status(200).json({user:"updated"})
    })
    .catch(()=>{
        res.status(500).json({error: "Could not fetch the document"})
    })

});

app.get("/get_offered_electives", (req, res) => {
  console.log("Fetching Currently offered electives");
  let a = [];
  let courses = db
    .collection("Electives")
    .find()
    .forEach((i) => {
      a.push(i);
    })
    .then(() => {
      res.status(200).json(a);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Couldn't fetch the Courses at the moment" });
    });
});

app.get("/get_status", (req, res) => {
  console.log("Fetching Status");
  let a = [];
  let courses = db
    .collection("Registration_status")
    .find()
    .forEach((i) => {
      a.push(i);
    })
    .then(() => {
      res.status(200).json(a);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Couldn't fetch the Courses at the moment" });
    });
});

app.get("/get_publish", (req, res) => {
  console.log("Fetching Pub Status");
  let a = [];
  let courses = db
    .collection("Publish_status")
    .find()
    .forEach((i) => {
      a.push(i);
    })
    .then(() => {
      res.status(200).json(a);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Couldn't fetch the Courses at the moment" });
    });
});

app.get("/get_regs", (req, res) => {
  console.log("Fetching Status");
  let a = [];
  let courses = db
    .collection(req.query.sem+"_Registrations")
    .find()
    .forEach((i) => {
      a.push(i);
    })
    .then(() => {
      res.status(200).json(a);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Couldn't fetch the Courses at the moment" });
    });
});

app.get("/access_database_6", (req,res)=>{
  let a = [];
  let courses = db
    .collection("6_"+req.query.asjhdfgjhfdg)
    .find()
    .forEach((i) => {
      a.push(i);
    })
    .then(() => {
      res.status(200).json(a);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Couldn't fetch the Courses at the moment" });
    });
})

app.get("/change_curr_6", (req,res)=>{
    db.collection("6_Free_Slots")
    .updateOne( {Name:req.query.name }, { $inc: { curr: 1 } } )
    .then(()=>{
        res.status(200).json({user:"Curr updated"})
    })
    .catch(()=>{
        res.status(500).json({error: "Could not fetch the document"})
    })

});

app.get("/change_done_6", (req,res)=>{
    db.collection("6_Registrations")
    .updateOne( {Roll:req.query.roll }, { $set: { done: 1 } } )
    .then(()=>{
        res.status(200).json({user:"Curr updated"})
    })
    .catch(()=>{
        res.status(500).json({error: "Could not fetch the document"})
    })

});

app.post("/insert_database_6", (req,res)=>{
  const data = req.body;
  console.log("Log Content:", data);
  
    db.collection("6_"+req.query.asjhdfgjhfdg)
    .insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("Inserted Test data");
    })
    .then(() => {
      res.status(200).json({ user: "Inserted" });
    })
    .catch(() => {
      res.status(500).json({ error: "Error" });
    });
})

app.get("/access_logs_6", (req,res)=>{
  let a = [];
  let courses = db
    .collection("6_Logs")
    .find()
    .forEach((i) => {
      a.push(i);
    })
    .then(() => {
      console.log(a)
      res.status(200).json(a);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Couldn't fetch the Courses at the moment" });
    });
})

app.get("/free_slots_6", (req,res)=>{
  let a = [];
  let courses = db
    .collection("6_Free_Slots")
    .find()
    .forEach((i) => {
      a.push(i);
    })
    .then(() => {
      console.log(a)
      res.status(200).json(a);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Couldn't fetch the Courses at the moment" });
    });
})

app.post("/insert_logs_6", (req,res)=>{    
  const data = req.body;
  console.log("Log Content:", data);

  const response = { message: "Log added successfully" };
  db.collection("6_Logs")
    .insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("Inserted Test data");
    })
    .then(() => {
      res.status(200).json({ user: "Inserted" });
    })
    .catch(() => {
      res.status(500).json({ error: "Error" });
    });
})

// app.get("/insert_test", (req, res, next) => {
//   // var test_obj = {e_id: "19MNG334",e_name: "Project Management", Category: "HUM", type: "FE", sem:6, status:"Offered", Credits:3, L_T_C:"3 0 0"}
//   var test_obj = {
//     e_id: "19KAN101 ",
//     e_name: "Kannada I",
//     Category: "HUM",
//     type: "FE",
//     sem: 6,
//     status: "Not_Offered",
//     Credits: 2,
//     L_T_C: "2 0 0",
//   };
//   db.collection("Electives")
//     .insertOne(test_obj, function (err, res) {
//       if (err) throw err;
//       console.log("Inserted Test data");
//     })
//     .then(() => {
//       res.status(200).json({ user: "Inserted" });
//     })
//     .catch(() => {
//       res.status(500).json({ error: "Error" });
//     });
// });

app.get("/reg_stu", (req, res, next) => {
  console.log("Sending Student Page")
  res.sendFile(__dirname + "/src/offered_electives/elective_reg.html");
});

app.get("/details", (req, res, next) => {
  console.log("Display details...")
  res.sendFile(__dirname + "/src/pages/user.html");
});

app.get("/automatic_process", (req, res, next) => {
  console.log("Sending Allocated List Page")
  res.sendFile(__dirname + "/src/automatic.html");
});

app.get("/final_list", (req, res, next) => {
  console.log("Sending Allocated List Page")
  res.sendFile(__dirname + "/src/final_list.html");
});

app.get("/final_list_stu", (req, res, next) => {
  console.log("Sending Allocated List Page")
  res.sendFile(__dirname + "/src/final_list_stu.html");
});

app.get("/submissions", (req, res, next) => {
  console.log("Sending Submissions Page")
  res.sendFile(__dirname + "/src/submissions_page.html");
});

app.get("/reg_admin", (req, res, next) => {
  res.sendFile(__dirname + "/src/offered_electives/elective_admin.html");
});

app.post("/add_L", (req, res) => {
  const data = req.body;
  console.log("Elective Details:", data);

  const response = { message: "Data received successfully" };
  db.collection("Electives")
    .insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("Inserted Test data");
    })
    .then(() => {
      res.status(200).json({ user: "Inserted" });
    })
    .catch(() => {
      res.status(500).json({ error: "Error" });
    });
  // res.json(response);
});

app.post("/update_L", (req, res) => {
  const id = req.body.fid;
  const nstatus = req.body.nstatus;

  console.log("Change status at:", id);
  console.log("To:", nstatus);
  const response = { message: "Data received successfully" };
  db.collection("Electives").updateOne(id, nstatus, (error, result) => {
    if (error) {
      console.error("Error updating document:", error);
      res.status(500).send("Error updating the document");
      return;
    }

    res.send("Document updated successfully!");
  });
});

app.post('/update_Elective', async (req, res) => {
  // const id = req.params.id;
  
  const { id, e_id,e_name, dept, type,sem,status,Category, Credits, L_T_C,Prereq,Cap } = req.body;
  console.log( e_id,e_name, dept, type,sem,status,Category, Credits, L_T_C,Prereq,Cap)
  try {
    // Update the elective document in the collection
    // const result = await  db.collection("Electives").updateOne(
    //   { _id: updatedElective.id },
    //   { $set: updatedElective.value } 
    // );
    
    // const document = await db
    //     .collection("Electives").findById(id);
    // console.log(document)
    
    const semAsInt = parseInt(sem, 10);
    const creAsInt = parseInt(Credits, 10);
    const capAsInt = parseInt(Cap, 10);
    
    const result = await db
      .collection("Electives")
      .updateOne({ e_id : e_id }, { $set: { 
          e_name: e_name, 
          dept: dept,
          type: type,
          sem: semAsInt,
          status: status,
          Category: Category,
          Credits: creAsInt,
          L_T_C: L_T_C,
          Prereq: Prereq,
          Cap: capAsInt
        } });
    
      
    if (result.matchedCount === 0) {
      // Elective with the given ID not found
      return res.status(404).json({ error: 'Elective not found' });
    }

    res.json({ message: 'Elective updated successfully' });
  } catch (error) {
    console.error('Error updating elective:', error);
    res.status(500).json({ error: 'An error occurred while updating the elective' });
  }
});



app.post("/add_registration", (req, res) => {
  const data = req.body;
  console.log("Response Details:", data);

  const response = { message: "Data added successfully" };
  db.collection(data.sem+"_Registrations")
    .insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("Inserted Response");
    })
    .then(() => {
      res.status(200).json({ user: "Inserted" });
    })
    .catch(() => {
      res.status(500).json({ error: "Error" });
    });

  // res.json(response);
});

app.post("/del_registration", (req, res) => {
  const data = req.body;
  console.log("To Delete Details:", data.sem);

  const response = { message: "Data deleted successfully" };
  db.collection(data.sem+"_Registrations")
    .deleteMany({ Roll: data.Roll }, function (err, obj) {
      if (err) throw err;
      console.log("Deleted document");
    })
    .then(() => {
      res.status(200).json({ user: "Deleted" });
    })
    .catch(() => {
      res.status(500).json({ error: "Error" });
    });

  // res.json(response);
});



//sam's start
app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: __dirname });
});

app.get("/log_me", (req, res) => {
  let a = [];
  let courses = db
    .collection("Users")
    .find()
    .forEach((i) => {
      a.push(i);
    })
    .then(() => {
      res.status(200).json(a);
    })
    .catch(() => {
      res.status(500).json({ error: "Couldn't fetch the Users at the moment" });
    });
});

app.post("/checkEmail", async (req, res) => {
  const { email } = req.body;
  const exists = await emailExists(email);
  const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  console.log(exists);
  if (exists == true) {
    const mailOptions = {
      from: "electivemgt@gmail.com",
      to: email,
      subject: "otp verification",
      text: `Your OTP is: ${otp}`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }

    var test_obj = { otp: otp, email: email };
    db.collection("OTP")
      .insertOne(test_obj, function (err, res) {
        if (err) throw err;
        console.log("Inserted Test data");
      })
      .then(() => {})
      .catch(() => {});
  }
  // console.log(email)
  res.json({ exists });
});

async function emailExists(email) {
  const user = await db.collection("Users").findOne({ email });
  return user !== null;
}

app.post("/verify_otp", async (req, res) => {
  // Convert the otp to an integer before querying the database
  const otpAsInt = parseInt(req.body.otp, 10);
  const filter = { otp: otpAsInt, email: req.body.email };
  console.log("Filter:", filter);

  try {
    const deleteResult = await db.collection("OTP").deleteOne(filter);
    console.log(deleteResult);
    var result = deleteResult.deletedCount == 1;
    console.log(result)
    res.status(200).send({ msg: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ msg: "An error occurred while verifying the OTP." });
  }
});

app.post("/update_password", async (req, res) => {
  const { email, newPassword } = req.body;

  // Add your logic to hash the password if needed

  try {
    const updateResult = await db
      .collection("Users")
      .updateOne({ email }, { $set: { password: newPassword } });
    if (updateResult.matchedCount === 1) {
      res.status(200).send({ msg: true });
    } else {
      res.status(404).send({ msg: false });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ msg: false });
  }
});

app.post("/reg_m", async (req, res) => {

  const email  = req.body;
  console.log(email)

  const mailOptions = {
      from: "electivemgt@gmail.com",
      to: email.email,
      subject: "Registration Successful",
      text: `Thank you for registering with us.`,
      html: `
    <div class="container" style="
            background-color: #ffffff;
            width: 768px;
            height: 480px;
            margin: 0 auto;
            padding: 20px;
            margin-top: 120px;
            box-shadow: 0 0 10px rgba(0, 183, 255, 0.222);
            border-radius: 5%;">
        <center><div><h1 style=" margin: 0; display: block ">ElectiveMGT</h1></div></center>
        <center><div><h2 style= "margin-top: 4%; display: block">Thank You ${email.name} for Registering with us.</h2></div></center>
        <div class="us" style = "margin-top: 12%; margin-left: 25%;">
            <p>Your Username is: ${email.username}</p>
        </div>
        <div class="p" style="margin-top: 10%;">
            <center><p>This is a platform where you can mange your electives effectively.<br>
                Also this helps in choosing your electives early before deadline.<br>
                Thank You.<br>
                Hope you Like our Platform.<br>
            </p></center>
        </div>
        
    </div>`
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }

});

app.post("/block_acc", async (req, res) => {

  const email  = req.body;
  console.log("block cc",email)

  const mailOptions = {
      from: "electivemgt@gmail.com",
      to: email.email,
      subject: "Account Blocked.",
      text: `Please do not Forget your password!!!!`,
      html: `
    <div class="container" style="
            background-color: #ffffff;
            background-image: url(https://cdn.glitch.global/4bc61e48-1f07-46ae-ab91-c1cee4b12763/circle-scatter-haikei.svg?v=1685262018458);
            width: 768px;
            height: 480px;
            margin: 0 auto;
            padding: 20px;
            margin-top: 120px;
            box-shadow: 0 0 10px rgba(0, 183, 255, 0.222);
            border-radius: 5%;">
        <center><div><h1 style=" margin: 0; display: block ">ElectiveMGT</h1></div></center>
        <center><div><h2 style= "margin-top: 4%; display: block">Hello there, User ${email.name} <br>You're Account is blocked for multiple wrong password attempts.</h2></div></center>
        <div class="us" style = "margin-top: 12%; margin-left: 25%;">
            <p>Your Username is: ${email.username}</p><br>
            <p> Try resetting your password.</p><br>
            <p> Follow the link to unblock your account... </p><br>
            <a href="https://electivemgt.glitch.me/fp" target="_blank" alt="forgot password"><p>Forgot Password</p></a>
        </div>
        <div class="p" style="margin-top: 10%;">
            <center><p>This is a platform where you can mange your electives effectively.<br>
                Also this helps in choosing your electives early before deadline.<br>
                Thank You.<br>
                Hope you Like our Platform.<br>
            </p></center>
        </div>
        
    </div>`
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }

});

//sam's end

//registr
app.post("/add_r", (req, res) => {
  const data = req.body;
  console.log("user Details:", data);

  const response = { message: "Data received successfully" };
  db.collection("Users")
    .insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("Inserted Test data");
    })
    .then(() => {
      res.status(200).json({ user: "Inserted" });
    })
    .catch(() => {
      res.status(500).json({ error: "Error" });
    });
});


app.post("/ad", (req, res) => {
  const data = req.body;
  console.log("Users:", data);

  const response = { message: "Data received successfully" };
  db.collection("Users")
    .insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("Inserted Test data");
    })
    .then(() => {
      res.status(200).json({ user: "Inserted" });
    })
    .catch(() => {
      res.status(500).json({ error: "Error" });
    });
  // res.json(response);
});

