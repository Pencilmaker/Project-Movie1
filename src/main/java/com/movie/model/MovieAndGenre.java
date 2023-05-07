package com.movie.model;

import java.util.List;

import lombok.Data;

@Data
public class MovieAndGenre {
    private Movie movie;
    private List<Genre> genre;       
}
