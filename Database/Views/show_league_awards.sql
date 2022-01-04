CREATE VIEW show_league_awards AS
	SELECT award_year, award_name, concat(first_name, last_name) AS name FROM 
    league_awards la JOIN player p ON la.fk_player_id = p.player_id JOIN
    person pe ON p.fk_ID = pe.ID;