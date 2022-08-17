$(window).scroll(function (e) {
  var $el = $(".position-sticky");
  var isPositionFixed = $el.css("position") == "fixed";
  if ($(this).scrollTop() > 200 && !isPositionFixed) {
    $el.css({ position: "fixed", top: "10px" });
  }
  if ($(this).scrollTop() < 200 && isPositionFixed) {
    $el.css({ position: "static", top: "10px" });
  }
});



const matches = [
  {
    id: 1,
    time: 1660917600000,
    teamsId: [1, 2],
    result: {
      winner: 1,
      run: 788,
      wicket: 1,
    },
  },
  {
    id: 2,
    time: 1660572000000,
    teamsId: [1, 2],
    result: {
      winner: 1,
      run: 788,
      wicket: 1,
    },
  },
  {
    id: 3,
    time: 1660485600000,
    teamsId: [1, 2],
    result: {
      winner: 1,
      run: 788,
      wicket: 1,
    },
  },
  {
    id: 4,
    time: 1660399200000,
    teamsId: [1, 2],
    result: {
      winner: 1,
      run: 788,
      wicket: 1,
    },
  },
  {
    id: 5,
    time: 1660312800000,
    teamsId: [1, 2],
    result: {
      winner: 1,
      run: 788,
      wicket: 1,
    },
  },
  {
    id: 6,
    time: 1660226400000,
    teamsId: [1, 2],
    result: {
      winner: 1,
      run: 788,
      wicket: 1,
    },
  },
];
const users = [
  {
    id: 1,
    name: "Nitish",
    email: "Nitish@gmail.com",
  },
  {
    id: 2,
    name: "Nitish2",
    email: "Nitish2@gmail.com",
  },
  {
    id: 3,
    name: "Nitish3",
    email: "Nitish2@gmail.com",
  },
  {
    id: 4,
    name: "Nitish4",
    email: "Nitish4@gmail.com",
  },
  {
    id: 5,
    name: "Nitish5",
    email: "Nitish5@gmail.com",
  },
  {
    id: 6,
    name: "Nitish6",
    email: "Nitish6@gmail.com",
  },
  {
    id: 7,
    name: "Nitish7",
    email: "Nitish7@gmail.com",
  },
  {
    id: 8,
    name: "Nitish8",
    email: "Nitish8@gmail.com",
  },
  {
    id: 9,
    name: "Nitish9",
    email: "Nitish2@gmail.com",
  },
  {
    id: 10,
    name: "Nitish10",
    email: "Nitish10@gmail.com",
  },
];
const teams = [
  {
    jersy: "assets/img/jerseys/bangalore_jersey.png",
    id: 1,
    name: "Bangalore",
  },
  {
    jersy: "assets/img/jerseys/chennai_jersey.png",
    id: 2,
    name: "Chennai",
  },
  {
    jersy: "assets/img/jerseys/delhi_jersey.png",
    id: 3,
    name: "Delhi",
  },
  {
    jersy: "assets/img/jerseys/gujarat_jersey.png",
    id: 4,
    name: "Gujarat",
  },
  {
    jersy: "assets/img/jerseys/hyderabad_jersey.png",
    id: 5,
    name: "Hyderabad",
  },
  {
    jersy: "assets/img/jerseys/kolkata_jersey.png",
    id: 6,
    name: "Kolkata",
  },
  {
    jersy: "assets/img/jerseys/lucknow_jersey.png",
    id: 7,
    name: "Lucknow",
  },
  {
    jersy: "assets/img/jerseys/mumbai_jersey.png",
    id: 8,
    name: "Mumbai",
  },
  {
    jersy: "assets/img/jerseys/punjab_jersey.png",
    id: 9,
    name: "Punjab",
  },
  {
    jersy: "assets/img/jerseys/rajasthan_jersey.png",
    id: 10,
    name: "Rajasthan",
  },
];
const scoreText = "*How many runs will the winnings team score ";

const nextMatch = matches
  .filter((x) => x.time > Date.now())
  .sort((a, b) => {
    return (a.time = b.time);
  })[0];

(() => {
  console.log(nextMatch);
  const team1 = teams.filter((x) => x.id == nextMatch["teamsId"][0])[0];
  const team2 = teams.filter((x) => x.id == nextMatch["teamsId"][1])[0];
  $("#team1-img").attr("src", team1.jersy);
  $("#team2-img").attr("src", team2.jersy);
  $("#match-time").text(new Date(nextMatch.time).toString().substring(0, 25));
  $("#team1-name").text(team1.name);
  $("#team2-name").text(team2.name);
  $("#run_predicted").text(scoreText);

  if (nextMatch?.time) {
    const intervalForMatch = setInterval(
      (matchTime) => {
        const cur = Date.now();
        if (matchTime < cur) {
          clearInterval(intervalForMatch);
        } else {
          const timeLeft = matchTime - cur;
          const Dechrs = timeLeft / (1000 * 60 * 60);
          const hrs = Math.floor(Dechrs);
          const Decmins = (Dechrs - hrs) * 60;
          const mins = Math.floor(Decmins);
          const second = Math.floor((Decmins - mins) * 60);

          $("#clock").text(
            `Time left to Predict - ${hrs} Hrs: ${mins} Mins: ${second} Secs`
          );
        }
      },
      1000,
      nextMatch.time
    );
  }

  $("#prediction").on("submit", function (e) {
    e.preventDefault();

    const data = {
      "match-date": new Date(nextMatch.time).toISOString(),
      "selected-team": $("#run_predicted").val() == 1 ? team1.name : team2.name,
      "predicted-runs": $("#run_input").val(),
    };
    $("#modal").removeClass("hidden");
    $(".main-container").addClass("opaque");
    $("#predicted_text").text(
      `Your Predicted ${data["selected-team"]} as the winning team & ${data["predicted-runs"]} runs as the winning score`
    );
    $(document).on("click", (e) => {
      e.preventDefault();
      if (!$(e.target).hasClass("flag")) {
        location.reload();
      }
    });

    $("#confirm").on("click", () => {
      e.preventDefault();
      $(".main-container").removeClass("opaque");
      $("#modal").addClass("hidden");

      $.post("/submit-score", data, (x) => {
        console.log(data);
      });
    });
  });
})();

(() => {

  const pastMatches = matches.filter((x) => {
    return x.time < Date.now();
  });
  pastMatches.forEach((y) => {
    const time = new Date(y.time).toString().substring(0, 25);
    const team1 = teams.filter((x) => x.id == y["teamsId"][0])[0];
    const team2 = teams.filter((x) => x.id == y["teamsId"][1])[0];
    const winner = teams.filter((x) => x.id == y.result.winner)[0];
    $("#results > tbody:last-child").append(`<tr>
    <td>${time}</td>
    <td><span><img class="small-image" src="${team1.jersy}" alt="umpire_avatar"></span><span classname="p-10">Vs</span><img class="small-image" src="${team2.jersy}" alt="umpire_avatar"></td>
    <td><div class="results-p"><span>${winner.name}</span><span>${y.result.run} Runs</span><span><button>View results</button></span></div></td>
  </tr>`);
  });
})();
