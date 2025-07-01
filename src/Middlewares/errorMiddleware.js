// Error handling middleware
errMiddleWare = (err,req,res,next)=>{
    const status = err.status || 500;
    res.status(status).json({
        // message: status!=500? err.message : "Server Error",
        message: err.message || "Server error",
        status: status
    })
}

module.exports = errMiddleWare;