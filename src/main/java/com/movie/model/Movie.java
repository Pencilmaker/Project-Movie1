package com.movie.model;

import lombok.Data;

@Data
public class Movie {
    private Long movie_id;
    private String title;
    private String overview;
    private String poster_path;
    private Long vote_average;
}
