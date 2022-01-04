CREATE VIEW show_leagues AS
	SELECT league_name as League, country, upper(continent) as continent FROM league;