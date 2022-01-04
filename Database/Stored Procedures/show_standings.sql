DELIMITER //
CREATE PROCEDURE show_standings(tournament_name varchar(46))
BEGIN
	IF tournament_name = "World Cup"
		THEN SELECT played, won, drawn, lost, points, goal_difference, wc_year,
        fk_team_name FROM wc_standing ORDER BY points;
	ELSE
		SELECT played, won, drawn, lost, points, goal_difference, season,
        fk_cname FROM league_standing ORDER BY points;
	END IF;
END //
DELIMITER ;