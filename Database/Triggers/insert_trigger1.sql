delimiter //
CREATE TRIGGER tr_insert_club 
AFTER INSERT ON club FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted ", new.cname, " into clubs"), user());
END //


CREATE TRIGGER tr_insert_defender 
AFTER INSERT ON defender FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted defender ID ", new.defender_id, " into defender"), user());
END //


CREATE TRIGGER tr_insert_forward
AFTER INSERT ON forward FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted forward ID ", new.forward_id, " into forward"), user());
END //

CREATE TRIGGER tr_insert_goalkeeper
AFTER INSERT ON goalkeeper FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted goalkeeper ID ", new.goalie_id, " into goalkeeper"), user());
END //

CREATE TRIGGER tr_insert_league
AFTER INSERT ON league FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted ", new.league_name, " into Leagues"), user());
END //

CREATE TRIGGER tr_insert_league_awards
AFTER INSERT ON league_awards FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted ", new.award_name, " into league_awards"), user());
END //

CREATE TRIGGER tr_insert_league_fixture
AFTER INSERT ON league_fixtures FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted fixture ID ", new.fixture_id, " into league_fixture"), user());
END //


CREATE TRIGGER tr_insert_midfielder
AFTER INSERT ON midfielder FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted midfielder ID ", new.midfielder_id, " into midfielder"), user());
END //

CREATE TRIGGER tr_insert_national_team
AFTER INSERT ON national_team FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted ", new.team_name, " into national_teams"), user());
END //

CREATE TRIGGER tr_insert_person
AFTER INSERT ON person FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted person ", concat(new.first_name, new.last_name), " with ID ", new.ID, " into person table."), user());
END //

CREATE TRIGGER tr_insert_player
AFTER INSERT ON player FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted player with ID ", new.player_id, " into player table"), user());
END //

CREATE TRIGGER tr_insert_referee
AFTER INSERT ON referee FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted referee with ID ", new.ref_id, " into referee table"), user());
END //

CREATE TRIGGER tr_insert_stadium
AFTER INSERT ON stadium FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted ", new.stadium_name, " with ID " , new.stadium_id, " into stadium table."), user());
END //

CREATE TRIGGER tr_insert_wc_awards
AFTER INSERT ON wc_awards FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted ", new.award_name, " into wc_awards."), user());
END //

CREATE TRIGGER tr_insert_wc_fixtures
AFTER INSERT ON wc_fixtures FOR EACH ROW
BEGIN
	INSERT INTO log(entry_time, description, changes_made_by)
	VALUES (NOW(), concat("Inserted fixture ID ", new.fixture_id, " into wc_fixtures."), user());
END //

delimiter ;