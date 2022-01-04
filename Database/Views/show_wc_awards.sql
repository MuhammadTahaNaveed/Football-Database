CREATE VIEW show_wc_awards AS
	SELECT award_year, award_name, concat(first_name, last_name) AS name FROM 
    wc_awards wca JOIN player p ON wca.fk_player_id = p.player_id JOIN
    person pe ON p.fk_ID = pe.ID;