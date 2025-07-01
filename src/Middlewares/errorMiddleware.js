// Error handling middleware
errMiddleWare = (err,req,res,next)=>{
    const status = err.status;
    res.status(status).json({
        message:err.message,
        status: status
    })
}

module.exports = errMiddleWare;