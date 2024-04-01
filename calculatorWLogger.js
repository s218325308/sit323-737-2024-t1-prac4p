const express= require("express");
//const res = require("express/lib/response");
const app= express();
//const fs = require('fs');
const winston = require('winston');


// Winston logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  app.use(express.static(__dirname))

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

// addition operation function
const add = (n1,n2) => {
    return n1+n2;
}

// Subtraction operation function
const subtract = (n1, n2) => {
    return n1-n2;
}

// divide operation function
const divide = (n1, n2) => {
  return n1/n2;
}

// multiplicaiton operation function
const multiply = (n1, n2) => {
  return n1*n2;
}


//addition endpoint
//test with - http://localhost:3040/add?n1=5&n2=10 - expected result 15
app.get("/add", (req,res)=>{
    try{
    const n1=parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 is not a valid number");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 is not a valid number");
    }

    logger.info('Parameters '+n1+' and '+n2+' received for addition');
    const result = add(n1,n2);
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});

//subtraction endpoint
//test with - http://localhost:3040/subtract?n1=10&n2=5 - expected result 5
app.get("/subtract", (req,res)=>{
    try{
    const n1=parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    
    if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 not a valid number");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 not a valid number");
  }

  logger.info('Parameters '+n1+' and '+n2+' received for subtraction');
  const result = subtract(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

//Division endpoint
//test with - http://localhost:3040/divide?n1=10&n2=2 - expected result 5
app.get("/divide", (req,res)=>{
  try{
  const n1=parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  
  if(isNaN(n1)) {
    logger.error("n1 is nincorrectly defined");
    throw new Error("n1 is not a valid number");
}
if(isNaN(n2)) {
    logger.error("n2 is incorrectly defined");
    throw new Error("n2 is not a valid number");
}

logger.info('Parameters '+n1+' and '+n2+' received for division');
const result = divide(n1,n2);
res.status(200).json({statuscocde:200, data: result }); 
} catch(error) { 
    console.error(error)
    res.status(500).json({statuscocde:500, msg: error.toString() })
  }
});

//Multiplication endpoint
//test with - http://localhost:3040/multiply?n1=5&n2=2 - expected result 10
app.get("/multiply", (req,res)=>{
  try{
  const n1=parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  
  if(isNaN(n1)) {
    logger.error("n1 is incorrectly defined");
    throw new Error("n1 is not a valid number");
}
if(isNaN(n2)) {
    logger.error("n2 is incorrectly defined");
    throw new Error("n2 is not a valid number");
}

logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
const result = multiply(n1,n2);
res.status(200).json({statuscocde:200, data: result }); 
} catch(error) { 
    console.error(error)
    res.status(500).json({statuscocde:500, msg: error.toString() })
  }
});

// Set the port to listening port to 3040
const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port"+port);
})



// user access via http://localhost:3040/index.html