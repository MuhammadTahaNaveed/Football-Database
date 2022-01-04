CREATE DATABASE IF NOT EXISTS FUTBUL2;
USE FUTBUL2;

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS person;
CREATE TABLE person
(
  DOB DATE NOT NULL DEFAULT (DATE(DATE_SUB(NOW(), INTERVAL ROUND(RAND()*15300) DAY))),
  Nationality varchar(46) NOT NULL,
  ID INT NOT NULL AUTO_INCREMENT,
  First_name varchar(60) NOT NULL,
  Last_Name varchar(60) NOT NULL,
  PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS national_team;
CREATE TABLE national_team
(
  team_name varchar(46) NOT NULL,
  Trophies INT NOT NULL DEFAULT 0,
  fk_manager INT NOT NULL UNIQUE,
  fk_captain INT UNIQUE,
  PRIMARY KEY (team_name),
  FOREIGN KEY (fk_manager) REFERENCES person(ID),
  FOREIGN KEY (fk_captain) REFERENCES player(player_id)
);


DROP TABLE IF EXISTS player;
CREATE TABLE player
(
  player_id INT NOT NULL AUTO_INCREMENT,
  height float(2) NOT NULL,
  weight float(2) NOT NULL,
  POTMs INT NOT NULL DEFAULT 0,
  Passes INT NOT NULL DEFAULT 0,
  Assists INT NOT NULL DEFAULT 0,
  Goals INT NOT NULL DEFAULT 0,
  red_cards INT NOT NULL DEFAULT 0,
  yellow_cards INT NOT NULL DEFAULT 0,
  matches INT NOT NULL DEFAULT 0,
  fouls INT NOT NULL DEFAULT 0,
  strong_foot char(1) NOT NULL DEFAULT 'R',
  fk_ID INT NOT NULL,
  fk_team_name varchar(46) NOT NULL,
  fk_cname varchar(46) NOT NULL,
  PRIMARY KEY (player_id),
  FOREIGN KEY (fk_ID) REFERENCES person(ID),
  FOREIGN KEY (fk_team_name) REFERENCES national_team(team_name),
  FOREIGN KEY (fk_cname) REFERENCES club(cname),
  
  CONSTRAINT valid_foot CHECK
  (
	(strong_foot = "L" OR strong_foot = "R")
  )
);


DROP TABLE IF EXISTS league_awards;
CREATE TABLE league_awards
(
  award_name INT NOT NULL,
  award_year INT NOT NULL,
  fk_player_id INT NOT NULL,
  PRIMARY KEY (award_name, award_year),
  FOREIGN KEY (fk_player_id) REFERENCES player(player_id)
);

DROP TABLE IF EXISTS Referee;
CREATE TABLE Referee
(
  ref_id INT NOT NULL AUTO_INCREMENT,
  matches INT NOT NULL,
  yellow_cards INT NOT NULL,
  red_cards INT NOT NULL,
  fk_ID INT NOT NULL,
  PRIMARY KEY (ref_id),
  FOREIGN KEY (fk_ID) REFERENCES person(ID)
);



CREATE TABLE wc_standing
(
  played INT NOT NULL DEFAULT 0,
  won INT NOT NULL DEFAULT 0,
  drawn INT NOT NULL DEFAULT 0,
  lost INT NOT NULL DEFAULT 0,
  points INT NOT NULL DEFAULT 0,
  goal_difference INT NOT NULL DEFAULT 0,
  wc_year char(4) NOT NULL,
  fk_team_name varchar(46) NOT NULL,
  PRIMARY KEY (wc_year),
  FOREIGN KEY (fk_team_name) REFERENCES national_team(team_name)
);

CREATE TABLE wc_fixtures
(
  fixture_id INT NOT NULL AUTO_INCREMENT,
  match_date DATE NOT NULL,
  fk_stadium_id INT NOT NULL,
  match_type varchar(2) NOT NULL,
  PRIMARY KEY (fixture_id),
  FOREIGN KEY (fk_stadium_id) REFERENCES stadium(stadium_id),
  
  CONSTRAINT valid_match_type CHECK
  (
	(match_type IN ("GS", "QF", "SF", "F"))
  )
);

CREATE TABLE wc_matches
(
   fk_fixture_id INT NOT NULL,
   fk_team_1 varchar(46) NOT NULL UNIQUE,
   fk_team_2 varchar(46) NOT NULL UNIQUE,
   match_status varchar(2) NOT NULL DEFAULT 'NP',
   winner INT,
   PRIMARY KEY (fk_fixture_id, fk_team_1, fk_team_2),
   FOREIGN KEY (fk_fixture_id) REFERENCES wc_fixtures(fixture_id),
   FOREIGN KEY (fk_team_1) REFERENCES national_team(team_name),
   FOREIGN KEY (fk_team_2) REFERENCES national_team(team_name),
   
   CONSTRAINT wc_valid_winner CHECK 
   (
    (winner = fk_team_1 OR winner = fk_team_2 OR winner = NULL)
   )
);

CREATE TABLE league
(
  continent varchar(10) NOT NULL,
  league_name varchar(16) NOT NULL,
  country varchar(46) NOT NULL,
  PRIMARY KEY (league_name),
  CONSTRAINT valid_continent CHECK 
   (
    (continent IN ("EU", "AF", "AS", "NA", "OCE", "SA", "AN"))
   ),
   
   CONSTRAINT valid_league CHECK
   (
    (league_name IN ("LaLiga", "Serie A", "Premier League", "Bundesliga"))
   )
);

CREATE TABLE wc_awards
(
  award_year INT NOT NULL,
  award_name INT NOT NULL,
  fk_player_id INT NOT NULL,
  PRIMARY KEY (award_year, award_name),
  FOREIGN KEY (fk_player_id) REFERENCES player(player_id)
);

CREATE TABLE log
(
  changes_made_by varchar(60) NOT NULL,
  description TEXT,
  entry_time time NOT NULL,
  log_id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (log_id)
);

CREATE TABLE moderators
(
  moderator_id INT NOT NULL AUTO_INCREMENT,
  username varchar(60) NOT NULL UNIQUE,
  password varchar(60) NOT NULL,
  PRIMARY KEY (moderator_id)
);

DROP TABLE IF EXISTS stadium;
CREATE TABLE stadium
(
  stadium_id INT NOT NULL AUTO_INCREMENT,
  capacity INT NOT NULL,
  field_height INT NOT NULL,
  field_width INT NOT NULL,
  fk_team_name varchar(46) NOT NULL,
  stadium_name varchar(35) NOT NULL,
  city varchar(85) NOT NULL,
  PRIMARY KEY (stadium_id),
  FOREIGN KEY (fk_team_name) REFERENCES national_team(team_name),
  UNIQUE (city, stadium_name)
);

CREATE TABLE league_fixtures
(
  fixture_id INT NOT NULL AUTO_INCREMENT,
  match_date DATE NOT NULL,
  fk_stadium_id INT NOT NULL,
  match_type varchar(11) NOT NULL,
  fk_league_name varchar(16) NOT NULL,
  PRIMARY KEY (fixture_id),
  FOREIGN KEY (fk_league_name) REFERENCES league(league_name),
  FOREIGN KEY (fk_stadium_id) REFERENCES stadium(stadium_id), 
  
  CONSTRAINT valid_match_type2 CHECK
  (
	(match_type IN ("GS", "QF", "SF", "F"))
  )
);

CREATE TABLE league_matches
(
   fk_fixture_id INT NOT NULL,
   fk_club_1 varchar(46) NOT NULL UNIQUE,
   fk_club_2 varchar(46) NOT NULL UNIQUE,
   match_status varchar(2) NOT NULL DEFAULT 'NP',
   winner INT,
   PRIMARY KEY (fk_fixture_id, fk_club_1, fk_club_2),
   FOREIGN KEY (fk_fixture_id) REFERENCES league_fixtures(fixture_id),
   FOREIGN KEY (fk_club_1) REFERENCES club(cname),
   FOREIGN KEY (fk_club_2) REFERENCES club(cname),
   
   CONSTRAINT l_valid_winner CHECK 
   (
    (winner = fk_club_1 OR winner = fk_club_2 OR winner = NULL)
   )
);

CREATE TABLE club
(
  established DATE NOT NULL DEFAULT (DATE(DATE_SUB(NOW(), INTERVAL ROUND(RAND()*17500) DAY))),
  cname varchar(46) NOT NULL,
  Trophies INT NOT NULL DEFAULT 0,
  fk_league_name varchar(16) NOT NULL,
  fk_captain INT UNIQUE,
  fk_manager INT NOT NULL UNIQUE,
  fk_stadium_id INT NOT NULL,
  PRIMARY KEY (cname),
  FOREIGN KEY (fk_stadium_id) REFERENCES stadium(stadium_id),
  FOREIGN KEY (fk_captain) REFERENCES player(player_id),
  FOREIGN KEY (fk_manager) REFERENCES person(ID),
  FOREIGN KEY (fk_league_name) REFERENCES league(league_name)
);



CREATE TABLE Forward
(
  cross_accuracy float(1) NOT NULL DEFAULT 0.0,
  crosses INT NOT NULL DEFAULT 0,
  rf_goals INT NOT NULL DEFAULT 0,
  lf_goals INT NOT NULL DEFAULT 0,
  shots_on_target INT NOT NULL DEFAULT 0,
  shots INT NOT NULL DEFAULT 0,
  freekicks_scored INT NOT NULL DEFAULT 0,
  penalties_scored INT NOT NULL DEFAULT 0,
  forward_id INT NOT NULL AUTO_INCREMENT,
  fk_player_id INT NOT NULL,
  PRIMARY KEY (forward_id),
  FOREIGN KEY (fk_player_id) REFERENCES player(player_id)
);


CREATE TABLE Midfielder
(
  through_balls INT NOT NULL DEFAULT 0,
  rf_goals INT NOT NULL DEFAULT 0,
  lf_goals INT NOT NULL DEFAULT 0,
  crosses INT NOT NULL DEFAULT 0,
  cross_accuracy float(1) NOT NULL DEFAULT 0.0,
  shots INT NOT NULL DEFAULT 0,
  shots_on_target INT NOT NULL DEFAULT 0,
  freekicks_scored INT NOT NULL DEFAULT 0,
  penalties_scored INT NOT NULL DEFAULT 0,
  interceptions INT NOT NULL DEFAULT 0,
  blocked_shots INT NOT NULL DEFAULT 0,
  midfielder_id INT NOT NULL AUTO_INCREMENT,
  fk_player_id INT NOT NULL,
  PRIMARY KEY (midfielder_id),
  FOREIGN KEY (fk_player_id) REFERENCES player(player_id)
);

CREATE TABLE Defender
(
  accurate_longballs INT NOT NULL DEFAULT 0,
  through_balls INT NOT NULL DEFAULT 0,
  tackles INT NOT NULL DEFAULT 0,
  last_man_tackles INT NOT NULL DEFAULT 0,
  tackle_success float(1) NOT NULL DEFAULT 0.0,
  duels_won INT NOT NULL DEFAULT 0,
  lf_goals INT NOT NULL DEFAULT 0,
  rf_goals INT NOT NULL DEFAULT 0,
  freekicks_scored INT NOT NULL DEFAULT 0,
  penalties_scored INT NOT NULL DEFAULT 0,
  goals_conceded INT NOT NULL DEFAULT 0,
  clean_sheets INT NOT NULL DEFAULT 0,
  defender_id INT NOT NULL AUTO_INCREMENT,
  fk_player_id INT NOT NULL,
  PRIMARY KEY (defender_id),
  FOREIGN KEY (fk_player_id) REFERENCES player(player_id)
);

CREATE TABLE Goalkeeper
(
  own_goals INT NOT NULL DEFAULT 0,
  accurate_longballs INT NOT NULL DEFAULT 0,
  saves INT NOT NULL DEFAULT 0,
  penalties_saved INT NOT NULL DEFAULT 0,
  punches INT NOT NULL DEFAULT 0,
  catches INT NOT NULL DEFAULT 0,
  sweeper_clearances INT NOT NULL DEFAULT 0,
  goal_kicks INT NOT NULL DEFAULT 0,
  clean_sheets INT NOT NULL DEFAULT 0,
  goals_conceded INT NOT NULL DEFAULT 0,
  goalie_id INT NOT NULL AUTO_INCREMENT,
  fk_player_id INT NOT NULL,
  PRIMARY KEY (goalie_id),
  FOREIGN KEY (fk_player_id) REFERENCES player(player_id)
);

CREATE TABLE league_standing
(
  played INT NOT NULL DEFAULT 0,
  won INT NOT NULL DEFAULT 0,
  drawn INT NOT NULL DEFAULT 0,
  points INT NOT NULL DEFAULT 0,
  lost INT NOT NULL DEFAULT 0,
  goal_difference INT NOT NULL DEFAULT 0,
  season char(9) NOT NULL,
  fk_cname varchar(46) NOT NULL,
  PRIMARY KEY(fk_cname, season),
  FOREIGN KEY (fk_cname) REFERENCES club(cname)
);
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;