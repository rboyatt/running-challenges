/*
 * These functions provide a way to generate the data relating to challenge
 * based on the results provided to them. This includes if the challenge
 * is complete, how many subparts there are, and how far you have to go etc..
 */

/*
var challenges = [];

challenges.push( { challengefunction: challenge_tourist, data : {
  "shortname": "tourist",
  "name": "Tourist",
  "data": 20,
  "help": "Run at 20+ different parkrun locations anywhere in the world."}
});
*/

function generate_running_challenge_data(data) {
  // console.log(data)
  challenge_data = []

  if (data.parkrun_results) {
/*
    challenges.forEach(function(e) {
      this.challenge_data.push(e.challengefunction.call(this, data, e.data))
    }, this);
*/
    challenge_data.push(challenge_tourist(data, {
      "shortname": "cowell-club",
      "name": "Cowell Club",
      "data": 100,
      "help": "Run at 100+ different parkrun locations anywhere in the world. Named after the first parkrunners to complete it. A quarter cowell is available at 25, half at 50, and three-quarter at 75."}))
    challenge_data.push(challenge_start_letters(data, {
      "shortname": "alphabeteer",
      "name": "Alphabeteer",
      "data": "abcdefghijklmnopqrstuvwyz",
      "help": "Run at parkrun locations starting with each letter of the English alphabet (except X)."}))
    challenge_data.push(challenge_single_parkrun_count(data, {
      "shortname": "single-ton",
      "name": "Single-Ton",
      "data": 100,
      "help": "Run 100+ parkruns at the same location."}))
    challenge_data.push(challenge_single_parkrun_count(data, {
      "shortname": "double-ton",
      "name": "Double-Ton",
      "data": 200,
      "help": "Run 200+ parkruns at the same location."}))
    challenge_data.push(challenge_stopwatch_bingo(data, {
      "shortname": "stopwatch-bingo",
      "name": "Stopwatch Bingo",
      "help": " Collect all the seconds from 00 to 59 in your finishing times."}))
    challenge_data.push(challenge_start_letters(data, {
      "shortname": "pirates",
      "name": "Pirates!",
      "data": "cccccccr",
      "help": "Run seven Cs and an R (say it out loud)."}))
    challenge_data.push(challenge_start_letters(data, {
      "shortname": "stayin-alive",
      "name": "Stayin' Alive",
      "data": "bgbgbg",
      "help": "Run three Bees and three Gees."}))
    challenge_data.push(challenge_words(data, {
      "shortname": "compass-club",
      "name": "Compass Club",
      "data": ["north","south","east","west"],
      "help": " Run at a parkrun named after each of the four compass points."}))
    challenge_data.push(challenge_parkruns(data, {
      "shortname": "full-ponty",
      "name": "The Full Ponty",
      "data": ["Pontefract","Pontypool","Pontypridd"],
      "help": "Run at all the parkruns named ponty... or ponte..."}))
    challenge_data.push(challenge_parkruns(data, {
      "shortname": "pilgrimage",
      "name": "Bushy Pilgrimage",
      "data": ["Bushy Park"],
      "help": "Run at Bushy parkrun, where it all began."}))
    challenge_data.push(challenge_nyd_double(data, {
      "shortname": "nyd-double",
      "name":  "NYD Double",
      "help": "Run two parkruns on one New Year's Day."}))
    challenge_data.push(challenge_groundhog_day(data, {
      "shortname": "groundhog-day",
      "name": "Groundhog Day",
      "help": "Finish with the same time at the same parkrun location on two consecutive parkruns."}))
    challenge_data.push(challenge_in_a_year(data, {
      "shortname": "obsessive-bronze",
      "name": "Bronze Level Obsessive",
      "data": 30,
      "help": "Run 30+ parkruns in one calendar year."}))
    challenge_data.push(challenge_in_a_year(data, {
      "shortname": "obsessive-silver",
      "name": "Silver Level Obsessive",
      "data": 40,
      "help": "Run 40+ parkruns in one calendar year."}))
    challenge_data.push(challenge_in_a_year(data, {
      "shortname": "obsessive-gold",
      "name": "Gold Level Obsessive",
      "data": 50,
      "help": "Run 50+ parkruns in one calendar year."}))

  }

  if (data.parkrun_results && data.geo_data) {
    challenge_data.push(challenge_by_region(data, {
      "shortname": "regionnaire",
      "name": "Regionnaire",
      "help": "Run all the parkrun locations in a geographical region."}))
  }

  return challenge_data
}

function generate_volunteer_challenge_data(data) {

  var volunteer_challenge_data = []

  if (data.volunteer_data) {
    volunteer_data = data.volunteer_data
    var volunteer_roles = [
        {"shortname": "equipment-storage", "name": "Equipment Storage and Delivery"},
        {"shortname": "comms-person", "name": "Communications Person"},
        {"shortname": "volunteer-coordinator", "name": "Volunteer Co-ordinator"},
        {"shortname": "setup", "name": "Pre-event Setup"},
        {"shortname": "first-timers-briefing", "name": "First Timers Briefing"},
        {"shortname": "sign-language", "name": "Sign Language Support"},
        {"shortname": "marshal", "name": "Marshal"},
        {"shortname": "tail-walker", "name": "Tail Walker"},
        {"shortname": "run-director", "name": "Run Director"},
        {"shortname": "lead-bike", "name": "Lead Bike"},
        {"shortname": "pacer", "name": "Pacer", "matching-roles": ["Pacer (5k only)"]},
        {"shortname": "vi-guide", "name": "Guide Runner", "matching-roles": ["VI Guide"]},
        {"shortname": "photographer", "name": "Photographer"},
        {"shortname": "timer", "name": "Timer", "matching-roles": ["Timekeeper", "Backup Timer"]},
        {"shortname": "funnel-manager", "name": "Funnel Manager"},
        {"shortname": "finish-tokens", "name": "Finish Tokens & Support", "matching-roles": ["Finish Tokens", "Finish Token Support"]},
        {"shortname": "barcode-scanning", "name": "Barcode Scanning"},
        {"shortname": "manual-entry", "name": "Number Checker"},
        {"shortname": "close-down", "name": "Post-event Close Down"},
        {"shortname": "results-processing", "name": "Results Processor"},
        {"shortname": "token-sorting", "name": "Token Sorting"},
        {"shortname": "run-report-writer", "name": "Run Report Writer"},
        {"shortname": "other", "name": "Other"},
        {"shortname": "warm-up-leader", "name": "Warm Up Leader", "matching-roles": ["Warm Up Leader (junior events only)"]},
    ]

    // Populate the results with the above
    volunteer_roles.forEach(function (role) {
        var this_role_data = create_data_object(role, "volunteer")
        this_role_data.summary_text = ""
        this_role_data.subparts_completed_count = 0
        if (role["matching-roles"] !== undefined){
            for (var i=0; i<role["matching-roles"].length; i++) {
                if (role["matching-roles"][i] in volunteer_data) {
                    this_role_data.subparts_completed_count += volunteer_data[role["matching-roles"][i]]
                }
            }
        }
        if (role.name in volunteer_data) {
            // console.log("Completed "+role.name+" "+volunteer_data[role.name]+" times")
            this_role_data.subparts_completed_count = volunteer_data[role.name]
        }
        if (this_role_data.subparts_completed_count > 0) {
            this_role_data.summary_text = "x"+this_role_data.subparts_completed_count
            this_role_data.complete = true
        } else {
            this_role_data.summary_text = '-'
        }

        update_data_object(this_role_data)
        volunteer_challenge_data.push(this_role_data)
    })
  }

  return volunteer_challenge_data
}

// Function adapted from https://www.movable-type.co.uk/scripts/latlong.html
function calculate_great_circle_distance(point1, point2) {

  if (point1.lat == '' || point1.lon == '' || point2.lat == '' || point2.lon == '') {
    return 0
  }

  var R = 6371; // km
  var φ1 = point1.lat * Math.PI / 180;
  var φ2 = point2.lat * Math.PI / 180;
  var Δφ = (point2.lat-point1.lat) * Math.PI / 180;
  var Δλ = (point2.lon-point1.lon) * Math.PI / 180;

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;

  return d
}

// These stat generation functions are all separate for each of maintenance
// They would be quicker if they were all in one loop, but it makes testing
// and extending them harder

// How many runs in total
function generate_stat_total_runs(parkrun_results) {
  var total_runs = 0
  parkrun_results.forEach(function (parkrun_event) {
    // Count the total runs
    total_runs += 1
  })
  return {
    "display_name": "Total number of parkruns",
    "help": "The total number of parkruns completed.",
    "value": total_runs
  }
}

// How many PBs in total
function generate_stat_total_pbs(parkrun_results) {
  var total_pbs = 0
  parkrun_results.forEach(function (parkrun_event) {
    // Count the number of PBs
    if (parkrun_event.pb) {
      total_pbs += 1
    }
  })
  return {
    "display_name": "Total PBs",
    "help": "The total number of PBs achieved across all parkruns.",
    "value": total_pbs
  }
}

// Maximum number of consecutive PBs in the results table
function generate_stat_longest_pb_streak(parkrun_results) {
  var longest_pb_streak = 0
  var this_pb_streak = 0
  parkrun_results.forEach(function (parkrun_event) {
    // Count the number of consecutive PBs
    if (parkrun_event.pb) {
      // Increment this PB streak, and if it exceeds the max, make it that too
      this_pb_streak += 1
      if (this_pb_streak > longest_pb_streak) {
        longest_pb_streak = this_pb_streak
      }
    } else {
      // Reset the PB streak
      this_pb_streak = 0
    }
  })
  return {
    "display_name": "Longest PB streak",
    "help": "The highest number of consecutive PBs achieved across all parkrun events.",
    "value": longest_pb_streak + " parkruns"
  }
}

// Sum of all parkrun distances ran, +5km for regular, +2km if there is 'junior'
// in the name of the event
function generate_stat_total_distance_ran(parkrun_results) {
  var total_distance_ran = 0
  parkrun_results.forEach(function (parkrun_event) {
    // Find the distance this athlete has run (juniors is 2k, else 5k)
    if (parkrun_event.name.toLowerCase().includes('juniors')) {
      total_distance_ran += 2
    } else {
      total_distance_ran += 5
    }
  })
  return {
    "display_name": "Total parkrun distance",
    "help": "The total distance achieved from adding up 5k for a parkrun, and 2k for a junior parkrun.",
    "value": total_distance_ran+"km"
  }
}

// Maximum number of runs in a calendar year, as determined from the date
// run in the results table
function generate_stat_most_runs_in_a_year(parkrun_results) {
  var runs_per_year = {}
  var value = "None"
  // Group results by year
  parkrun_results.forEach(function (parkrun_event) {
    if (!(parkrun_event.date_obj.getFullYear() in runs_per_year)) {
      runs_per_year[parkrun_event.date_obj.getFullYear()] = 0
    }
    runs_per_year[parkrun_event.date_obj.getFullYear()] += 1
  })
  // Sort years by number of runs descending
  var best_year_sorted = Object.keys(runs_per_year).sort(function(a, b) {
      return runs_per_year[b] - runs_per_year[a]
  })
  // Find all the years with the maximum value
  var best_years = []
  if (best_year_sorted.length > 0) {
    best_year_sorted.forEach(function (year){
      if (runs_per_year[year] == runs_per_year[best_year_sorted[0]]) {
        best_years.push(year)
      }
    })
    value = runs_per_year[best_year_sorted[0]] + " in " + best_years.join(", ")
  }

  return {
    "display_name": "Most parkruns in a year",
    "help": "The highest number of parkruns attended in a calendar year.",
    "value": value
  }
}

// The number of parkruns that satisfy the equation 'p parkruns run at least p times'
// E.g. you have run 4 different parkruns at least 4 times.
function generate_stat_p_index(parkrun_results) {
  var p_index = 0
  var event_attendance_tally = {}

  parkrun_results.forEach(function (parkrun_event) {
    if (!(parkrun_event.name in event_attendance_tally)) {
      event_attendance_tally[parkrun_event.name] = 0
    }
    event_attendance_tally[parkrun_event.name] += 1
  })
  // Sort events by number of runs descending
  var event_attendance_sorted = Object.keys(event_attendance_tally).sort(function(a, b) {
      return event_attendance_tally[b] - event_attendance_tally[a]
  })
  // Iterate through the events, and as long as the numbers of times we have
  // run at the even is greater than the index value, increment the p-index
  event_attendance_sorted.forEach(function(event_name, index) {
    if (event_attendance_tally[event_name] > index) {
      p_index += 1
    }
  })
  return {
    "display_name": "p-index",
    "help": "The number of parkruns that satisfy the equation 'p parkruns run at least p times', e.g. if you have run 4 different parkruns at least 4 times each, your p-index is 4.",
    "value": p_index
  }
}

// The maximum contiguous series of parkrun event numbers you have attended
// (at any event), starting at 1.
function generate_stat_wilson_index(parkrun_results) {
  var wilson_index = 0
  var event_numbers_visited = {}

  parkrun_results.forEach(function (parkrun_event) {
    event_numbers_visited[parkrun_event.event_number] = true
  })
  // Iterate through the maximum set of event numbers they could have, and check
  // if each is in the object, we stop when we can't find one
  var index
  for (index=1; index<Object.keys(event_numbers_visited).length; index++) {
    if (index in event_numbers_visited) {
      wilson_index += 1
    } else {
      break
    }
  }
  return {
    "display_name": "wilson-index",
    "help": "The maximum contiguous series of parkrun event numbers you have attended (at any event), starting at 1.",
    "value": wilson_index
  }
}

// What date was this athlete's first run
function generate_stat_parkrun_birthday(parkrun_results) {
  var birthday = "-"
  if (parkrun_results.length > 0) {
    birthday_date = parkrun_results[0].date_obj
    // Format the date as a string with the user's locale
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    // for more options
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // In en-GB this gives something like : "Thursday, 20 December 2012"
    // in en-US it would be "Thursday, December 20, 2012"
    // in pl-PL it would be "czwartek, 20 grudnia 2012"
    birthday = birthday_date.toLocaleDateString(undefined, options);
  }
  return {
    "display_name": "parkrun birthday",
    "help": "The date of your first parkrun!",
    "value": birthday
  }
}

// Total number of years parkrunning, if today if your anniversary it will go up
function generate_stat_years_parkrunning(parkrun_results) {
  var years = 0
  if (parkrun_results.length > 0) {
    var birthday_date = parkrun_results[0].date_obj
    var now = new Date()
    // .getDay() returns the day of the week (0-6)
    // .getDate() returns the day of the month (1-31)
    // So be careful when comparing!
    if (now.getMonth() > birthday_date.getMonth() || (now.getMonth() == birthday_date.getMonth() && now.getDate() >= birthday_date.getDate())) {
      years = now.getFullYear() - birthday_date.getFullYear()
    } else {
      years = now.getFullYear() - birthday_date.getFullYear() - 1
    }
  }
  return {
    "display_name": "Years parkrunning",
    "help": "How many full years you have been going to parkrun since your first event.",
    "value": years
  }
}

function generate_stat_events_run(parkrun_results) {
  // Find those parkrun events that have been completed
  var events_run = {}

  parkrun_results.forEach(function (parkrun_event) {
    if (!(parkrun_event.name in events_run)) {
      events_run[parkrun_event.name] = true
    }
  })

  return {
    "display_name": "Events run",
    "help": "The number of different parkrun events you have attended.",
    "value": Object.keys(events_run).length
  }
}

// A percentage showing how many of the events you have run at are new events,
// i.e someone who never repeats an event is at 100%, and someone who never
// leaves home approaches 0%.
function generate_stat_tourist_quotient(parkrun_results) {
  // Find those parkrun events that have been completed
  var events_run = {}
  var tourist_quotient = "-"

  parkrun_results.forEach(function (parkrun_event) {
    if (!(parkrun_event.name in events_run)) {
      events_run[parkrun_event.name] = true
    }
  })

  var event_count = Object.keys(events_run).length
  if (parkrun_results.length > 0) {
    tourist_quotient =  (100 * event_count / parkrun_results.length).toFixed(2) + "%"
  }

  return {
    "display_name": "Tourist Quotient",
    "help": "The percentage of parkrun events attended that you had not been to before. If you never repeat a parkrun event it will be 100%, if you never tourist at all it will head towards 0%.",
    "value": tourist_quotient
  }
}

function generate_stat_runs_this_year(parkrun_results) {
  // Find those parkrun events that have been completed
  var runs_this_year = 0
  var now = new Date()

  parkrun_results.forEach(function (parkrun_event) {
    if (parkrun_event.date_obj.getFullYear() == now.getFullYear()) {
      runs_this_year += 1
    }
  })

  return {
    "display_name": "parkruns this year",
    "help": "How many parkrun events you have got a time at this calendar year.",
    "value": runs_this_year
  }
}

// Total distance between parkruns that you have run - a measure of how much
// you have travelled to go to parkrun!
function generate_stat_total_distance_travelled(parkrun_results, geo_data) {
  var total_distance_travelled = 0
  var previous_event_location = undefined
  parkrun_results.forEach(function (parkrun_event) {

    // Work out how far the parkrunner has travelled (between consecutive events)
    if (geo_data.data.events[parkrun_event.name] !== undefined) {
      var event_location_info = geo_data.data.events[parkrun_event.name]
      // We need to know the previous event location to work out the distance
      // so we keep track of this separately to the previous event - in case we
      // don't know where someone inbetween is
      if (previous_event_location !== undefined) {
        // Compare the names of the parkruns and don't compute the distance if they
        // are the same - it should be fine without this, but we might get odd
        // small numbers being added if there are rounding errors
        if (parkrun_event.name != previous_event_location.name) {
          // Both event_location_info and previous_event_location have properties
          // of .lat and .lon, so we can pass them to this function
          // These distances can clock up fast if you regularly visit friends and
          // family in different parts of the country. A weekend in Manchester
          // from Winchester could easily add on another 250km for two consecutive
          // weeks
          total_distance_travelled += Math.round(calculate_great_circle_distance(event_location_info, previous_event_location))
        }
      }
      // Store where we were this week for next time
      previous_event_location = event_location_info
    }
  })

  return {
    "display_name": "Total distance travelled",
    "help": "The cumulative distance you have travelled between each parkrun event.",
    "value": total_distance_travelled + "km"
  }
}

// Count of the number of distinct countries you have visited
function generate_stat_total_countries_visited(parkrun_results, geo_data) {
  var parkrun_countries_visited = {}
  parkrun_results.forEach(function (parkrun_event) {

    // Work out how many countries have been visited
    if (geo_data.data.events[parkrun_event.name] !== undefined) {
      var event_location_info = geo_data.data.events[parkrun_event.name]
      if (event_location_info.country_name != 'unknown') {
        if (!(event_location_info.country_name in parkrun_countries_visited)) {
          parkrun_countries_visited[event_location_info.country_name] = true
        }
      }
    }
  })

  return {
    "display_name": "Countries visited",
    "help": "The total number of countries that you have parkrunned in.",
    "value": Object.keys(parkrun_countries_visited).length
  }
}

function generate_stat_average_parkrun_location(parkrun_results, geo_data) {
  var lat_sum = 0
  var lon_sum = 0
  var count = 0

  parkrun_results.forEach(function (parkrun_event) {
    // Work out how far the parkrunner has travelled to this location
    if (parkrun_event.name in geo_data.data.events) {
      var event_location_info = geo_data.data.events[parkrun_event.name]
      if (event_location_info.lat && event_location_info.lon) {
        lat_sum += parseFloat(event_location_info.lat)
        lon_sum += parseFloat(event_location_info.lon)
        count += 1
      }
    }
  })

  var value = "None"
  if (count > 0) {
    value = (lat_sum/count).toFixed(5) + "," + (lon_sum/count).toFixed(5)
  }

  return {
    "display_name": "Average parkrun lat/lon location",
    "help": "The average latitude/longitude of all your parkrun attendances.",
    "value": value
  }
}

// Furthest parkrun you have run away from your home parkrun
function generate_stat_furthest_travelled(parkrun_results, geo_data, home_parkrun) {
  furthest_travelled = {
    'parkrun_event': undefined,
    'distance': 0,
    'display_name': ''
  }
  parkrun_results.forEach(function (parkrun_event) {
    // Work out how far the parkrunner has travelled to this location
    var event_location_info = geo_data.data.events[parkrun_event.name]
    if (event_location_info !== undefined) {
      if (parkrun_event.name != home_parkrun.name) {
        var distance = Math.round(calculate_great_circle_distance(event_location_info, home_parkrun))
        if (distance > furthest_travelled.distance) {
          furthest_travelled.distance = distance
          furthest_travelled.parkrun_event = event_location_info
        }
      }
    }
  })

  if (furthest_travelled.parkrun_event !== undefined) {
    furthest_travelled.display_name = furthest_travelled.parkrun_event.name + ", " + furthest_travelled.parkrun_event.country_name
  }

  return {
    "display_name": "Furthest travelled",
    "help": "The furthest away parkrun you have been to (calculated from your home parkrun).",
    "value": furthest_travelled.display_name + ", "+ furthest_travelled.distance + "km"
  }
}

// Which is the closest parkrun you haven't done yet
function generate_stat_nearest_event_not_done_yet(parkrun_results, geo_data, home_parkrun_info) {
  // Find those parkrun events that have been completed
  var events_run = {}

  parkrun_results.forEach(function (parkrun_event) {
    if (!(parkrun_event.name in events_run)) {
      events_run[parkrun_event.name] = true
    }
  })
  var event_distances = {}

  $.each(geo_data.data.events, function (event_name, event_info) {
    if (!(event_name in events_run)) {
      if ((event_info.status == 'Live' || event_info.status == 'unknown') && event_info.lat && event_info.lon) {
        event_distances[event_name] = calculate_great_circle_distance(event_info, home_parkrun_info)
      }
    }
  })

  // Sort the list of events not done by distance
  var sorted_events = Object.keys(event_distances).sort(function(a, b) {
      return event_distances[a] - event_distances[b]
  })

  var value = "All parkruns completed!"

  if (sorted_events.length > 0) {
    var nendy_name = sorted_events[0]
    var nendy = geo_data.data.events[nendy_name]
    value = nendy.name + ", " + nendy.country_name+ " - " + Math.round(event_distances[nendy_name]) + "km away"
  }

  return {
    "display_name": "Nearest event not done yet (NENDY)",
    "help": "The nearest parkrun event to your home parkrun that you have not done yet.",
    "value": value
  }
}

// How many times has your name appeared on the volunteer roster (note, not the
// same as volunteer club progress, as this takes into account multiple roles
// per week)
function generate_stat_total_volunteer_roles(volunteer_data) {
  var total_volunteer_roles = 0
  $.each(volunteer_data, function (role, count) {
    total_volunteer_roles += count
  })
  return {
    "display_name": "Total volunteer roles",
    "help": "The total number of times your name has appeared next to a role on the volunteer roster - note this includes the fact you can get multiple credits per week, and does not indicate your eligibility for a milestone shirt.",
    "value": total_volunteer_roles
  }
}

// How many of the different volunteer roles have you done
function generate_stat_total_distinct_volunteer_roles(volunteer_data) {
  return {
    "display_name": "Total distinct volunteer roles",
    "help": "How many of the different volunteering roles have been completed.",
    "value": Object.keys(volunteer_data).length
  }
}


function generate_stats(data) {

  stats = {}

  // Stats that only need the list of parkruns
  if (data.info.has_parkrun_results) {
    stats['total_runs'] = generate_stat_total_runs(data.parkrun_results)
    stats['total_pbs'] = generate_stat_total_pbs(data.parkrun_results)
    stats['longest_pb_streak'] = generate_stat_longest_pb_streak(data.parkrun_results)
    stats['total_distance_ran'] = generate_stat_total_distance_ran(data.parkrun_results)
    stats['most_runs_in_a_year'] = generate_stat_most_runs_in_a_year(data.parkrun_results)
    stats['runs_this_year'] = generate_stat_runs_this_year(data.parkrun_results)
    stats['p_index'] = generate_stat_p_index(data.parkrun_results)
    stats['wilson_index'] = generate_stat_wilson_index(data.parkrun_results)
    stats['parkrun_birthday'] = generate_stat_parkrun_birthday(data.parkrun_results)
    stats['years_parkrunning'] = generate_stat_years_parkrunning(data.parkrun_results)
    stats['events_run'] = generate_stat_events_run(data.parkrun_results)
    stats['tourist_quotient'] = generate_stat_tourist_quotient(data.parkrun_results)

  }

  // Stats that need a list of parkruns, and additional geo data to determine where they are
  if (data.info.has_parkrun_results && data.info.has_geo_data) {
    stats['total_distance_travelled'] = generate_stat_total_distance_travelled(data.parkrun_results, data.geo_data)
    stats['total_countries_visited'] = generate_stat_total_countries_visited(data.parkrun_results, data.geo_data)
    stats['average_parkrun_location'] = generate_stat_average_parkrun_location(data.parkrun_results, data.geo_data)
  }

  // Stats that need the user data available, and we are on their page (i.e. has
  // to be the person who has installed the plugin)
  if (data.info.has_parkrun_results && data.info.has_geo_data && data.info.is_our_page && data.info.has_home_parkrun) {
    stats['furthest_travelled'] = generate_stat_furthest_travelled(data.parkrun_results, data.geo_data, data.user_data.home_parkrun_info)
    stats['nearest_event_not_done_yet'] = generate_stat_nearest_event_not_done_yet(data.parkrun_results, data.geo_data, data.user_data.home_parkrun_info)
  }

  // Stats based off the volunteer data
  if (data.info.has_volunteer_data) {
    stats['total_volunteer_roles'] = generate_stat_total_volunteer_roles(data.volunteer_data)
    stats['total_distinct_volunteer_roles'] = generate_stat_total_distinct_volunteer_roles(data.volunteer_data)
  }

  return stats
}

function get_initial_letter(event_name) {
  return event_name[0].toLowerCase()
}


function generate_global_tourism_data(parkrun_results, geo_data) {
    // Generate essentially the same results as the regionnaire challenge all over again
    // console.log("generate_global_tourism_data()")
    var global_tourism = []

    // Mapping countries to flag image files
    var flag_map = {
        "New Zealand": "nz",
        "Australia": "au",
        "Denmark": "dk",
        "Finland": "fi",
        "France": "fr",
        "Germany": "de",
        // "Iceland"--
        "Ireland": "ie",
        "Italy": "it",
        "Malaysia": "my",
        "Canada": "ca",
        "Norway": "no",
        "Poland": "pl",
        "Russia": "ru",
        "Singapore": "sg",
        "South Africa": "za",
        "Sweden": "se",
        "UK": "gb",
        "USA": "us"
        // "Zimbabwe"--
    }

    regions = geo_data.data.regions
    events_completed_map = group_results_by_event(parkrun_results)
    sorted_region_heirachy = calculate_child_regions(regions, events_completed_map, "World")

    sorted_region_heirachy.child_regions.sort().forEach(function(top_level_country) {
        // Skip the world
        if (top_level_country.name == "World") {
            return
        }

        var country_info = {
            "name": top_level_country.name,
            "visited": false,
            "first_visited": top_level_country.first_ran_on,
            "icon": browser.extension.getURL("/images/flags/flag-unknown.png")
        }
        // Update the icon if it exists
        if (top_level_country.name in flag_map) {
            country_info.icon = browser.extension.getURL("/images/flags/"+flag_map[top_level_country.name]+".png")
        }

        var child_events = find_region_child_events(top_level_country)

        if (top_level_country.child_events_completed_count > 0) {
            country_info["visited"] = true
        }
        global_tourism.push(country_info)
    })
    return global_tourism
}

function find_region_child_events(region, events=[]) {
    // Add the direct child events of this region
    region.child_events.forEach(function (region_event) {
        events.push(region_event)
    })
    // Further query all the child regions of this region
    region.child_regions.forEach(function (child_region) {
        find_region_child_events(child_region, events)
    })
    return events
}

function create_data_object(params, category) {
    var o = {
        "shortname": params.shortname,
        "name": params.name,
        "help": params.help,
        "start_time": new Date(),
        "complete": false,
        "completed_on": null,
        "subparts": [],
        "subparts_completed_count": 0,
        "subparts_detail": [],
        "badge_icon": category+"-"+params.shortname,
        // Which events have contributed to this challenge?
        // - a list of names
        "completed_qualifying_events": {},
        // Which are the closest events that could contribute to this challenge
        // in order to complete it
        // - a list of names
        "nearest_qualifying_events": {},
        // All of the qualifying events for this challenge
        // - a list of names
        "all_qualifying_events": {},
        // Whether this challenge has something you can map
        "has_map": false,
        // Where the reference home parkrun is, if available
        "home_parkrun": undefined
    }
    return o
}

function update_data_object(o) {
    o['stop_time'] = new Date()
    o['duration'] = o.stop_time - o.start_time
    o['subparts_count'] = o.subparts.length
    // console.log("Completed data for " + o.shortname + " in " + o['duration'] + "ms")
    return o
}

// Group all parkruns completed by event
function group_results_by_event(parkrun_results) {

    events = {}
    parkrun_results.forEach(function (parkrun_event) {
        // Create an empty list if we haven"t seen this parkrun before
        if (!(parkrun_event.name in events)) {
            events[parkrun_event.name] = []
        }
        // Append this instance to the appropriate event list
        events[parkrun_event.name].push(parkrun_event)
    });

    return events
}

function event_contains_word(event_name, word) {
  if (event_name.toLowerCase().indexOf(word) != -1) {
    return true
  }
}

function group_global_events_by_containing_word(geo_data, words) {

  var events = {}

  $.each(words, function(index, word) {
    events[word] = []
  })

  $.each(geo_data.data.events, function (event_name, event_info) {
    if (event_info.status == 'Live' || event_info.status == 'unknown') {
      $.each(words, function(index, word) {
        if (event_contains_word(event_name, word)) {
          events[word].push(event_info)
        }
      })
    }
  })

  return events

}

function group_global_events_by_initial_letter(geo_data) {

  var events = {}

  $.each(geo_data.data.events, function (event_name, event_info) {
    if (event_info.status == 'Live' || event_info.status == 'unknown') {
      event_letter = get_initial_letter(event_info["shortname"])
      if (events[event_letter] === undefined) {
        events[event_letter] = []
      }
      events[event_letter].push(event_info)
    }
  })

  return events

}


function sort_events_by_distance(events, from_location) {

  console.log("sort_events_by_distance()")
  var sorted_events = []

  // If we have a unusable from location, return straight away
  if (from_location == undefined || from_location.lat == undefined || from_location.lon == undefined) {
    return sorted_events
  }

  // Only process those events with locations - they should all have locations,
  // but if they don't, there isn't a lot we can do
  events_with_location_info = []
  $.each(events, function(event_name, event_info) {
    if (event_info.lat && event_info.lon) {
      events_with_location_info.push({
        "name": event_name,
        "distance": calculate_great_circle_distance(event_info, from_location),
        "lat": event_info.lat,
        "lon": event_info.lon
      })
    }
  })

  sorted_events = events_with_location_info.sort(function(event_a, event_b) {
      return event_a.distance - event_b.distance
  })

  // console.log(sorted_events)
  return sorted_events

}

function sort_grouped_events_by_distance(grouped_events, from_location) {
  var sorted_events = {}

  // If we have a unusable from location, return straight away
  if (from_location == undefined || from_location.lat == undefined || from_location.lon == undefined) {
    return sorted_events
  }

  $.each(grouped_events, function (group, event_list) {

    // Only process those events with locations - they should all have locations,
    // but if they don't, there isn't a lot we can do
    events_with_location_info = []
    $.each(event_list, function(index, event) {
      if (event.lat && event.lon) {
        events_with_location_info.push(event)
      }
    })

    // Sort the list of places with locations by their distance from the
    // from_location provided
    sorted_events[group] = events_with_location_info.sort(function(event_a, event_b) {
        return calculate_great_circle_distance(event_a, from_location) - calculate_great_circle_distance(event_b, from_location)
    })
  })

  return sorted_events

}

function get_parkrun_event_details(data, parkrun_name) {
  // Standard information
  var parkrun_event_details = {
    "name": parkrun_name
  }
  // Everything else needs geo data
  if (data.info.has_geo_data) {
    // Add the location in if we have it
    if (parkrun_name in data.geo_data.data.events) {
      geo_event = data.geo_data.data.events[parkrun_name]
      if (geo_event.lat && geo_event.lon) {
        parkrun_event_details.lat = geo_event.lat
        parkrun_event_details.lon = geo_event.lon
        // Now we have the location, we can also add in the distance to our
        // home parkrun, if we have set that, and we are looking at our page
        if (data.info.is_our_page && data.info.has_home_parkrun) {
          parkrun_event_details.distance = calculate_great_circle_distance(geo_event, get_home_parkrun(data))
        }
      }
      if (geo_event.local_url && geo_event.shortname) {
        parkrun_event_details.event_url = geo_event.local_url + '/' + geo_event.shortname
      }
    }
  }
  return parkrun_event_details
}

function challenge_start_letters(data, params) {

  // Find the data we are interested in
  parkrun_results = data.parkrun_results
  geo_data = data.geo_data
  user_data = data.user_data
  home_parkrun = undefined
  if (user_data) {
    home_parkrun = user_data.home_parkrun_info
  }

    var letters = params.data

    var o = create_data_object(params, "runner")
    o.has_map = true

    // Add all the subparts to the list
    for (i=0; i<letters.length; i++) {
        // Store each one as the parts we need to do
        o.subparts.push(letters[i])
        // Create placeholders for each contributing result
        o.subparts_detail.push(null)
    }

    checked_parkruns = []

    parkrun_results.forEach(function (parkrun_event) {

        if (!(checked_parkruns.includes(parkrun_event.name))) {
            initial_letter = parkrun_event.name[0].toLowerCase()
            // Skips those parkruns that aren't going to match at all
            if (o.subparts.includes(initial_letter)) {
                // Loop through all the letters we are looking for
                for (i=0; i<o.subparts.length; i++) {
                    // Find a matching subpart that hasn't yet been filled in
                    if (o.subparts_detail[i] == null && o.subparts[i] == initial_letter) {
                        // Add the event
                        p = Object.create(parkrun_event)
                        p.subpart = initial_letter
                        p.info = p.date
                        o.subparts_detail[i] = p
                        o.subparts_completed_count += 1
                        if (!(parkrun_event.name in o.completed_qualifying_events)) {
                          o.completed_qualifying_events[parkrun_event.name] = get_parkrun_event_details(data, parkrun_event.name)
                        }

                        if (o.subparts.length == o.subparts_completed_count) {
                            o.complete = true
                            o.completed_on = p.date
                        }
                        // Get out of the for loop
                        break
                    }
                }
            }

            // Lets not process this parkrun again, even if we have run it more than once
            checked_parkruns.push(parkrun_event.name)
        }
    })

    // Group and sort the qualifying events
    grouped_events = {}
    sorted_grouped_events = {}
    if (geo_data) {
      grouped_events = group_global_events_by_initial_letter(geo_data)
      if (home_parkrun) {
        sorted_grouped_events = sort_grouped_events_by_distance(grouped_events, home_parkrun)
      }
    }

    // Add in all the missing ones
    for (i=0; i< o.subparts.length; i++) {
        if (o.subparts_detail[i] == null) {
            o.subparts_detail[i] = {
                "subpart": o.subparts[i],
                "info": "-"
            }


            // if (grouped_events !== undefined) {
            // Add those events for this letter
            if (o.subparts[i] in grouped_events) {
              $.each(grouped_events[o.subparts[i]], function (index, event) {
                // Don't add them if they are already there
                if (!(event.name in o.all_qualifying_events)) {
                  details = get_parkrun_event_details(data, event.name)
                  if (has_lat_lon(details)) {
                    o.all_qualifying_events[event.name] = details
                  }
                }
              })
            }
            // }

            // If this is our page (i.e. the athlete id in our profile matches
            // that of this page), then we can try and work out which are closest
            if (data.info.is_our_page) {
              // console.log(sorted_grouped_events)
              // if (sorted_grouped_events !== undefined) {
              if (o.subparts[i] in sorted_grouped_events) {
                // Add the first on that we haven't already added
                $.each(sorted_grouped_events[o.subparts[i]], function(index, event) {
                  // Only add it, and break out of the loop, if it is new
                  if (!(event.name in o.nearest_qualifying_events)) {
                    o.nearest_qualifying_events[event.name] = get_parkrun_event_details(data, event.name)
                    // Break out
                    return false
                  }
                })
              }
            }
            // }
        }
    }

    // console.log(o)

    // Return an object representing this challenge
    return update_data_object(o)
}

function challenge_words(data, params) {

  var parkrun_results = data.parkrun_results
    var word_array = params.data

    var o = create_data_object(params, "runner")
    o.has_map = true

    // Add all the subparts to the list
    word_array.forEach(function (word) {
        // Store each one as the parts we need to do
        o.subparts.push(word.toLowerCase())
        // Create placeholders for each contributing result
        o.subparts_detail.push(null)
    })

    // Group and sort the qualifying events
    // If we don't have the data, then the objects will be empty, and the checking
    // code will iterate over an empty objection
    grouped_events = {}
    sorted_grouped_events = {}
    if (data.info.has_geo_data) {
      grouped_events = group_global_events_by_containing_word(geo_data, o.subparts)
      if (data.info.has_home_parkrun && data.info.is_our_page) {
        sorted_grouped_events = sort_grouped_events_by_distance(grouped_events, data.user_data.home_parkrun_info)
      }
    }

    checked_parkruns = []

    parkrun_results.forEach(function (parkrun_event) {

        if (!(checked_parkruns.includes(parkrun_event.name))) {
            // Loop through all the words we are looking for
            for (i=0; i<o.subparts.length; i++) {
                // Find a matching subpart that hasn't yet been filled in
                if (o.subparts_detail[i] == null && parkrun_event.name.toLowerCase().indexOf(o.subparts[i]) != -1) {
                    // Add the event
                    p = Object.create(parkrun_event)
                    p.subpart = o.subparts[i]
                    p.info = p.date
                    o.subparts_detail[i] = p
                    o.subparts_completed_count += 1

                    if (!(parkrun_event.name in o.completed_qualifying_events)) {
                      o.completed_qualifying_events[parkrun_event.name] = get_parkrun_event_details(data, parkrun_event.name)
                    }

                    if (o.subparts.length == o.subparts_completed_count) {
                        o.complete = true
                        o.completed_on = p.date
                    }
                    // Get out of the for loop
                    break
                }
            }


            // Lets not process this parkrun again, even if we have run it more than once
            checked_parkruns.push(parkrun_event.name)
        }
    })

    // Add in all the missing ones
    for (i=0; i< o.subparts.length; i++) {
        if (o.subparts_detail[i] == null) {
            o.subparts_detail[i] = {
                "subpart": o.subparts[i],
                "info": "-"
            }

            // If this is our page, and hence we know where the home parkrun is,
            // find out the closest event to complete this sub-part
            if (o.subparts[i] in sorted_grouped_events) {
              $.each(sorted_grouped_events[o.subparts[i]], function(index, event) {
                if (!(event.name in o.nearest_qualifying_events)) {
                  o.nearest_qualifying_events[event.name] = get_parkrun_event_details(data, event.name)
                  // Break out of the .each loop after we have found the closest
                  return false
                }
              })
            }

            if (o.subparts[i] in grouped_events) {
              // If we haven't added this event to the closest collection, then add it
              // to the all collection
              $.each(grouped_events[o.subparts[i]], function(index, event) {
                if (!(event.name in o.nearest_qualifying_events) && !(event.name in o.all_qualifying_events)) {
                  o.all_qualifying_events[event.name] = get_parkrun_event_details(data, event.name)
                }
              })
            }
        }
    }

    // Return an object representing this challenge
    return update_data_object(o)
}

function challenge_parkruns(data, params) {

  var parkrun_results = data.parkrun_results
    var parkrun_array = params.data

    var o = create_data_object(params, "runner")
    o.has_map = true

    // Add all the subparts to the list
    parkrun_array.forEach(function (parkrun_name) {
        // Store each one as the parts we need to do
        o.subparts.push(parkrun_name)//.toLowerCase())
        // Create placeholders for each contributing result
        o.subparts_detail.push(null)
    })

    events = group_results_by_event(parkrun_results)

    Object.keys(events).forEach(function (parkrun_name) {

        if (o.subparts.includes(parkrun_name)) {
            subparts_index = o.subparts.indexOf(parkrun_name)

            p = Object.create(events[parkrun_name][0])
            p.subpart = o.subparts[subparts_index]
            p.info = p.date
            o.subparts_detail[subparts_index] = p
            o.subparts_completed_count += 1
            if (!(parkrun_name in o.completed_qualifying_events)) {
              o.completed_qualifying_events[parkrun_name] = get_parkrun_event_details(data, parkrun_name)
            }

            if (o.subparts.length == o.subparts_completed_count) {
                o.complete = true
                o.completed_on = p.date
            }
        }
    })

    // Add in all the missing ones
    for (i=0; i< o.subparts.length; i++) {
        if (o.subparts_detail[i] == null) {
            o.subparts_detail[i] = {
                "subpart": o.subparts[i],
                "info": "-"
            }
            // Add all of the missing events to the 'all' collection, as it doesn't
            // really make a lot of sense for them to be in the 'closest' set,
            // as they are all the closest
            if (data.info.has_geo_data) {
              o.all_qualifying_events[o.subparts[i]] = get_parkrun_event_details(data, o.subparts[i])
            }
        }
    }

    // Return an object representing this challenge
    return update_data_object(o)
}

// Complete x different parkruns (20 and 100 are standard)
function challenge_tourist(data, params) {

    var parkrun_results = data.parkrun_results

    var count = params.data

    var o = create_data_object(params, "runner")
    o.has_map = true

    distinct_parkruns_completed = {}

    // Add all the subparts to the list
    for (i=0; i<count; i++) {
        o.subparts.push("parkrun_"+i)
    }

    $.each(data.parkrun_results, function(index, parkrun_event) {
    // parkrun_results.forEach(function (parkrun_event) {
        var completed_so_far = Object.keys(distinct_parkruns_completed).length
        // Ony do the first 20
        if (completed_so_far < o.subparts.length) {
            if (!(parkrun_event.name in distinct_parkruns_completed)) {
                o.subparts_completed_count += 1
                // Add it in for the next complete subpart
                p = Object.create(parkrun_event)
                p.subpart = o.subparts_completed_count
                p.info = parkrun_event.date
                o.subparts_detail.push(p)

                // Add to the events done list, so that we can map them
                if (!(parkrun_event.name in o.completed_qualifying_events)) {
                  o.completed_qualifying_events[parkrun_event.name] = get_parkrun_event_details(data, parkrun_event.name)
                }

                distinct_parkruns_completed[parkrun_event.name] = true
            }
            if (o.subparts_completed_count == o.subparts.length) {
                o.complete = true
                o.completed_on = parkrun_event.date
            }
        }

    });

    // If we haven't completed this challenge, try and find out what possible
    // events would allow us to complete it.
    if (o.complete == false) {
      if (data.info.has_geo_data) {
        if (data.info.has_home_parkrun && data.info.is_our_page) {
          sorted_events = sort_events_by_distance(data.geo_data.data.events, get_home_parkrun(data))
          $.each(sorted_events, function(index, event) {
            // Only consider this if we haven't done it
            if (!(event.name in o.completed_qualifying_events)) {
              // If we still need a top-up to get to completion, add it to nearest events
              if (Object.keys(o.nearest_qualifying_events).length + Object.keys(o.completed_qualifying_events).length < o.subparts.length) {
                if (!(event.name in o.nearest_qualifying_events)) {
                  o.nearest_qualifying_events[event.name] = get_parkrun_event_details(data, event.name)
                }
              }
            }
          })
        }
        // Add any other qualifying events
        $.each(data.geo_data.data.events, function(index, event) {
          if (!(event.name in o.completed_qualifying_events) && !(event.name in o.nearest_qualifying_events)) {
            if (!(event.name in o.all_qualifying_events)) {
              o.all_qualifying_events[event.name] = get_parkrun_event_details(data, event.name)
            }
          }
        })
      }
    }

    // Work out if it is possible to have a partial completion
    if (params.shortname == "cowell-club" && o.complete == false) {
        if (o.subparts_completed_count >= 75) {
            o.partial_completion = true
            o.partial_completion_name = "Three-Quarter Cowell"
            o.partial_completion_badge_icon = "runner-three-quarter-cowell-club"
        } else if (o.subparts_completed_count >= 50) {
            o.partial_completion = true
            o.partial_completion_name = "Half Cowell"
            o.partial_completion_badge_icon = "runner-half-cowell-club"
        } else if (o.subparts_completed_count >= 25) {
            o.partial_completion = true
            o.partial_completion_name = "Quarter Cowell"
            o.partial_completion_badge_icon = "runner-quarter-cowell-club"
        }
    }

    // Return an object representing this challenge
    return update_data_object(o)
}

// Just return true for now
// Return true if the athlete id for this page match what is stored in the user data
function is_our_page(data) {
  return has_user_data_athlete_id(data) && has_this_athlete_id(data) && get_user_data_athlete_id(data) == get_this_athlete_id(data)
}

function has_user_data(data) {
  return data.user_data !== undefined
}

function get_user_data(data) {
  return data.user_data
}

function has_user_data_athlete_id(data) {
  return has_it = false
  if (has_user_data(data)) {
    if (get_user_data(data).athlete_number !== undefined) {
      has_it = true
    }
  }
  return has_it
}

function get_user_data_athlete_id(data) {
  return get_user_data(data).athlete_number
}

function has_this_athlete_id(data) {
  return data.athlete_id !== undefined
}

function get_this_athlete_id(data) {
  return data.athlete_id
}

// Return true if there is valid geo data available
function has_geo_data(data) {
  geo_data = get_geo_data(data)
  return geo_data !== undefined
}

function get_geo_data(data) {
  return data.geo_data
}

// Return true if there is a home parkrun set
function has_home_parkrun(data) {
  home_parkrun = get_home_parkrun(data)
  return home_parkrun !== undefined
}

function get_home_parkrun(data) {
  if (data.user_data !== undefined) {
    return data.user_data.home_parkrun_info
  }
  return undefined
}

function has_lat_lon(details) {
  return details.lat !== undefined && details.lon !== undefined
}

function challenge_stopwatch_bingo(data, params) {

  var parkrun_results = data.parkrun_results

    var o = create_data_object(params, "runner")

    // Add all the subparts to the list
    for (i=0; i<60; i++) {
        number_string = i.toString()
        if (i < 10) {
            number_string = "0"+number_string
        }
        o.subparts.push(number_string)
        o.subparts_detail[number_string] = null
    }

    parkrun_results.forEach(function (parkrun_event) {
        // Take the last 2 characters of the time
        seconds = parkrun_event.time.substr(parkrun_event.time.length - 2)
        // Convert them to a number to get the index in our array
        subparts_detail_index = parseInt(seconds)
        if (o.subparts_detail[subparts_detail_index] == null) {
            o.subparts_detail[subparts_detail_index] = Object.create(parkrun_event)
            o.subparts_detail[subparts_detail_index].subpart = seconds
            o.subparts_detail[subparts_detail_index].info = parkrun_event.time
            o.subparts_completed_count += 1

            if (!(parkrun_event.name in o.completed_qualifying_events)) {
              o.completed_qualifying_events[parkrun_event.name] = get_parkrun_event_details(data, parkrun_event.name)
            }

            if (o.subparts.length == o.subparts_completed_count) {
                o.complete = true
                o.completed_on = parkrun_event.date
            }
        }

    });

    // Add in all the missing ones
    for (i=0; i< o.subparts_detail.length; i++) {
        if (o.subparts_detail[i] == null) {
            o.subparts_detail[i] = {
                "subpart": o.subparts[i],
                "info": "-"
            }
        }
    }

    // Return an object representing this challenge
    return update_data_object(o)
}

// Complete 100 parkruns at the same venue
function challenge_single_parkrun_count(data, params) {

  var parkrun_results = data.parkrun_results

    var count = params.data

    var o = create_data_object(params, "runner")
    o.subparts = ["1"]

    parkruns_completed = {}
    max_count = 0
    max_parkrun = null

    parkrun_results.forEach(function (parkrun_event) {
        if (!(parkrun_event.name in parkruns_completed)) {
            parkruns_completed[parkrun_event.name] = {
                "name": parkrun_event.name,
                "count": 0,
                "completed": false,
                "completed_at": null,
                "subpart": count+"+"
            }
        }
        parkruns_completed[parkrun_event.name].count += 1
        if (parkruns_completed[parkrun_event.name].count > max_count) {
            max_parkrun = Object.create(parkruns_completed[parkrun_event.name])
            max_count = parkruns_completed[parkrun_event.name].count
        }
        // Mark as complete if we've hit the magic 100 at this parkrun,
        // and store some good bits of data
        if (parkruns_completed[parkrun_event.name].count == count) {
            o.complete = true
            o.subparts_completed_count += 1
            parkruns_completed[parkrun_event.name].completed = true
            parkruns_completed[parkrun_event.name].completed_at = parkrun_event.date
            if (o.completed_on == null) {
                o.completed_on = parkrun_event.date
            }
        }
    });

    if (o.complete) {
        // Return all parkrun events where the limit has been reached
        Object.keys(parkruns_completed).forEach(function (parkrun) {
            if (parkruns_completed[parkrun].completed) {
                p = parkruns_completed[parkrun]
                p.info = p.count
                o.subparts_detail.push(p)
                if (!(parkrun in o.completed_qualifying_events)) {
                  o.completed_qualifying_events[parkrun] = get_parkrun_event_details(data, parkrun)
                }
            }
        })
    } else {
        if (max_parkrun !== null) {
            // If it isn't complete, give the biggest one so far as detail info
            max_parkrun.info = max_parkrun.count
            o.subparts_detail.push(max_parkrun)
        }
    }


    // Return an object representing this challenge
    return update_data_object(o)
}

function challenge_nyd_double(data, params) {

  var parkrun_results = data.parkrun_results
    var o = create_data_object(params, "runner")
    o.subparts = ["1"]
    o.summary_text = "0"

    o.has_map = true
    if (has_home_parkrun(data) && is_our_page(data)) {
      o.home_parkrun = get_home_parkrun(data)
    }

    var previous_parkrun = null

    parkrun_results.forEach(function (parkrun_event) {
        // Take the first 6 characters of the date to get the '01/01/' part
        day_month = parkrun_event.date.substr(0, 6)

        if (previous_parkrun != null && day_month == "01/01/" && parkrun_event.date == previous_parkrun.date) {

            o.subparts_detail.push({
                "name": parkrun_event.name+" and "+previous_parkrun.name,
                "date": parkrun_event.date,
                "info": parkrun_event.date,
                "subpart": o.subparts_detail.length + 1
            })

            // Add to the events done list, so that we can map them
            if (!(parkrun_event.name in o.completed_qualifying_events)) {
              o.completed_qualifying_events[parkrun_event.name] = get_parkrun_event_details(data, parkrun_event.name)
            }
            if (!(previous_parkrun.name in o.completed_qualifying_events)) {
              o.completed_qualifying_events[previous_parkrun.name] = get_parkrun_event_details(data, previous_parkrun.name)
            }

            o.subparts_completed_count += 1
            // Mark it complete the first time it occurs
            if (!o.complete) {
                o.complete = true
                o.completed_on = parkrun_event.date
            }

        }

        previous_parkrun = parkrun_event

    });

    if (o.subparts_detail.length == 0) {
        o.subparts_detail.push({
            "subpart": o.subparts_detail.length + 1,
            "info": "-"
        })
    }

    // Change the summary to indicate number of times completed
    if (o.subparts_completed_count > 0) {
        o.summary_text = "x"+o.subparts_completed_count
    }

    // Return an object representing this challenge
    return update_data_object(o)
}

function challenge_groundhog_day(data, params) {

  var parkrun_results = data.parkrun_results
    var o = create_data_object(params, "runner")
    o.subparts = ["1"]
    o.summary_text = "0"
    o.has_map = true
    if (has_home_parkrun(data) && is_our_page(data)) {
      o.home_parkrun = get_home_parkrun(data)
    }

    var previous_parkrun = null

    parkrun_results.forEach(function (parkrun_event) {

        if (previous_parkrun != null && parkrun_event.time == previous_parkrun.time && parkrun_event.name == previous_parkrun.name) {

            o.subparts_detail.push({
                "name": parkrun_event.name,
                "date": previous_parkrun.date+" and "+parkrun_event.date,
                "info": parkrun_event.time+" on "+previous_parkrun.date+" and "+parkrun_event.date,
                "subpart": o.subparts_detail.length + 1
            })

            // Add to the events done list, so that we can map them
            if (!(parkrun_event.name in o.completed_qualifying_events)) {
              o.completed_qualifying_events[parkrun_event.name] = get_parkrun_event_details(data, parkrun_event.name)
            }

            o.subparts_completed_count += 1
            // Mark it complete the first time it occurs
            if (!o.complete) {
                o.complete = true
                o.completed_on = parkrun_event.date
            }

        }

        previous_parkrun = parkrun_event

    });

    if (o.subparts_detail.length == 0) {
        o.subparts_detail.push({
            "subpart": o.subparts_detail.length + 1,
            "info": "-"
        })
    }

    // Change the summary to indicate number of times completed
    if (o.subparts_completed_count > 0) {
        o.summary_text = "x"+o.subparts_completed_count
    }

    // Return an object representing this challenge
    return update_data_object(o)
}

function challenge_in_a_year(data, params) {

    var parkrun_results = data.parkrun_results
    var count = params.data

    var o = create_data_object(params, "runner")
    o.subparts = ["1"]
    o.summary_text = "0"

    by_year = {}

    parkrun_results.forEach(function (parkrun_event) {
        // Take the first 6 characters of the date to get the '01/01/' part
        year = parkrun_event.date.substr(6, 4)

        if (!(year in by_year)) {
            by_year[year] = []
        }

        by_year[year].push(parkrun_event)

    })

    Object.keys(by_year).sort().forEach(function (year) {
        if (by_year[year].length >= count) {
            o.subparts_detail.push({
                "name": year,
                "date": year,
                "info": by_year[year].length,
                "subpart": count+"+"
            })
            o.subparts_completed_count += 1
            if (!o.complete) {
                o.complete = true
                o.completed_on = year
            }
        }
    })

    if (o.subparts_detail.length == 0) {
        o.subparts_detail.push({
            "subpart": count+"+",
            "info": "-"
        })
    }

    // Change the summary to indicate number of times completed
    if (o.subparts_completed_count > 0) {
        o.summary_text = "x"+o.subparts_completed_count
    }

    // Return an object representing this challenge
    return update_data_object(o)
}

function calculate_child_regions(regions, events_completed_map, parent_region) {

    var region_info = {
        'name': parent_region,
        "complete": false,
        "completed_on": null,
        "child_regions": [],
        "child_events": [],
        "child_events_total": 0,
        "child_events_completed": {},
        "child_events_completed_count": 0,
        "first_ran_on": null
    }

    // child_region_info = []
    if (regions[parent_region].child_region_names.length == 0) {
        // No sub regions
    } else {
        regions[parent_region].child_region_names.sort().forEach(function (region_name) {
            child_region_parkrun_info = calculate_child_regions(regions, events_completed_map, region_name)
            region_info["child_regions"].push(child_region_parkrun_info)
            region_info["child_events_total"] += child_region_parkrun_info["child_events_total"]
            region_info["child_events_completed_count"] += child_region_parkrun_info["child_events_completed_count"]
            if (region_info.first_ran_on == null ||
                (child_region_parkrun_info.first_ran_on != null &&
                    child_region_parkrun_info.first_ran_on < region_info.first_ran_on)) {
                region_info.first_ran_on = child_region_parkrun_info.first_ran_on
            }
            // child_region_info.push(child_region_parkrun_info)
        })
    }

    region_info["child_events_total"] += regions[parent_region].child_event_names.length
    if (regions[parent_region].child_event_names.length > 0) {
        regions[parent_region].child_event_names.sort().forEach(function (event_name) {
            // Work out if we have completed this parkrun
            // Lets just say yes for now
            region_info["child_events"].push(event_name)
            if (event_name in events_completed_map) {
                region_info["child_events_completed_count"] += 1
                // Add the first completed run at this event to our list
                region_info["child_events_completed"][event_name] = events_completed_map[event_name][0]
                first_run_date = events_completed_map[event_name][0].date_obj
                if (region_info.first_ran_on == null ||
                    first_run_date < region_info.first_ran_on) {
                    region_info.first_ran_on = first_run_date
                }
            }
        })
    }

    // Now that we have processed everything below, see if we have completed
    // this region
    region_info["complete"] = (region_info["child_events_completed_count"] == region_info["child_events_total"])

    return region_info

}

function generate_regionnaire_detail_info(region, depth) {
    var details = []

    prefix = Array(depth).join("- ")

    if (region["child_events_total"] > 0) {
        details.push({
                "subpart": prefix + region["name"],
                "info": region["child_events_completed_count"] + "/" + region["child_events_total"],
                "complete": region["child_events_completed_count"] == region["child_events_total"],
                "completed_on": null
        })
    }

    region["child_regions"].forEach(function(child_region) {
        sub_region_info = generate_regionnaire_detail_info(child_region, depth+1);
        sub_region_info.forEach(function (array_entry) {
            details.push(array_entry)
        })
    })

    return details
}

function challenge_by_region(data, params) {

  var parkrun_results = data.parkrun_results
  var geo_data = data.geo_data

    var o = create_data_object(params, "runner")
    o.summary_text = ""

    regions = geo_data.data.regions
    // Sort all of the completed parkruns by event so that we can pick out which
    // has been run, and when that was
    o.events_completed_map = group_results_by_event(parkrun_results)
    sorted_region_heirachy = calculate_child_regions(regions, o.events_completed_map, "World")
    // console.log(sorted_region_heirachy)

    o.regions = sorted_region_heirachy
    o.subparts_detail = generate_regionnaire_detail_info(sorted_region_heirachy, 0)

    // Work out of any regions have been completed
    o.subparts_detail.forEach(function (detail) {
        if (detail.complete) {
            o.subparts_completed_count += 1
            o.complete = true
        }
    })

    if (o.subparts_completed_count > 0) {
        o.summary_text = "x"+o.subparts_completed_count
    }

    // Return an object representing this challenge
    return update_data_object(o)
}
