DELIMITER //
CREATE PROCEDURE show_fixtures(tournament_name varchar(46))
BEGIN
	IF tournament_name = "World Cup"
		THEN SELECT match_date, match_type, fk_stadium_id, fk_team_1, fk_team_2, match_status,
        winner FROM wc_fixtures wcf JOIN wc_matches wcm ON wcf.fixture_id = wcm.fk_fixture_id; 
	ELSE
		SELECT match_date, match_type, fk_stadium_id, fk_club_1, fk_club_2, fk_league_name, 
        match_status, winner FROM league_fixtures lf JOIN league_matches lm 
        ON lf.fixture_id = lm.fk_fixture_id;
	END IF;
END //
DELIMITER ;