const express = require("express");
const router = express.Router({ mergeParams: true });

const { isLoggedIn } = require("../middleware");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/CatchAsync");
const User = require("../models/user");
const VotingAgenda = require("../models/votingAgenda");
const VotingResult = require("../models/votingResult");
const Vote = require("../models/vote");
router.post(
  "/api/createVoting",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const { title, notes, dates, monthsWithYear, allowMultipleDateVotes } =
      req.body;
    try {
      const votingAgenda = new VotingAgenda({
        title,
        monthsWithYear,
        dates,
        votersName: [],
        totalVote: 0,
        allowMultipleDateVotes,
        notes,
        author: req.user,
      });
      for (let month of monthsWithYear) {
        const votingResult = new VotingResult();
        votingResult.monthWithYear = month;
        votingResult.votingAgenda = votingAgenda;
        votingResult.results = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0,
        ];
        votingAgenda.votingResults.push(votingResult);
        await votingResult.save();
      }
      await votingAgenda.save();
      const user = await User.findById(req.user);
      user.createdVote.push(votingAgenda);
      await user.save();
      return res.json({
        message: "Successfully created",
        flash: "success",
        redirectData: `${votingAgenda._id}`,
      });
    } catch (error) {
      return next(error);
    }
  })
);
router.get(
  "/api/vote/:id",
  catchAsync(async (req, res, next) => {
    try {
      const votingAgenda = await VotingAgenda.findById(req.params.id).populate({
        path: "votingResults",
      });
      if (!votingAgenda) return next(new ExpressError("Not Found!", 404));
      return res.json({
        votingAgenda,
      });
    } catch (error) {
      return next(new ExpressError("Not Found!", 404));
    }
  })
);
router.post(
  "/api/vote/:id",
  catchAsync(async (req, res, next) => {
    // reminder :
    // monthsWithYear -> [] (in VotingAgenda)
    // monthWithYear -> "" (in VotingResult)
    try {
      const { name, dates, monthsWithYear } = req.body;
      const votingAgenda = await VotingAgenda.findById(req.params.id);
      if (!votingAgenda.votersName.includes(name)) {
        votingAgenda.votersName.push(name);
      }
      votingAgenda.totalVote += 1;
      // update by month
      for (let month of monthsWithYear) {
        const votingResult = await VotingResult.findOne({
          votingAgenda: req.params.id,
          monthWithYear: month,
        });
        for (let date of dates) {
          // looping selected date then matching it to selected month, then operate
          if (`${date.split("-")[1]}-${date.split("-")[2]}` == month) {
            const existingSimilarVote = await Vote.find({
              votingAgenda: votingAgenda,
              name: name,
              votedDate: date,
            });
            // console.log(existingSimilarVote);
            if (existingSimilarVote.length > 0) {
              return next(
                new ExpressError(
                  `Same name on the same vote date : ${date} is already exist!`,
                  403
                )
              );
            }
            const vote = new Vote({
              name,
              votingAgenda,
              votingResult,
              votedDate: date,
            });

            await vote.save();
            const day = parseInt(date.split("-")[0]);
            // results is array of num (of numbers of vote)
            votingResult.results[parseInt(day) - 1] += 1; // add 1 vote to the voted date
            // details is array of vote model
            votingResult.details.push(vote);
          }
        }
        await votingResult.save();
        await votingAgenda.save();
      }
      return res.json({
        message: "Successfully vote!",
        flash: "success",
        redirectData: req.params.id,
      });
    } catch (error) {
      return next(error);
    }
  })
);
router.get(
  "/api/users/vote",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const votingAgendas = await VotingAgenda.find({ author: req.user });
    return res.json({
      votingAgendas,
    });
  })
);
// router.post(
//   "/api/vote/:id/stat",isLoggedIn,catchAsync(async(req,res,next)=>{
//     const votingAgenda = await VotingAgenda.findById(req.params.id).populate(
//       "votingResults"
//     );
//     if (!votingAgenda) return next(new ExpressError("Not Found!", 404));
//     if (votingAgenda.author !== req.user._id) return next(new ExpressError("You're not allowed to do that!", 401));

//     for (let i = 1; i<=30;i++){
//       await VotingResult.find({votingAgenda:votingAgenda,result})
//     }

//   })
// )
router.post(
  "/api/vote/:id/searchByNames",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    try {
      const { names, votingAgenda } = req.body;
      const votes = [];
      for (let name of names) {
        votes.push(await Vote.find({ votingAgenda: votingAgenda, name: name }));
      }
      return res.send({
        votes,
      });
    } catch (error) {
      return next(error);
    }
  })
);
module.exports = router;
