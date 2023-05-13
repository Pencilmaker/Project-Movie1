package com.movie.model;

import java.util.List;

import lombok.Data;

@Data
public class MovieInfos {
    private Movie movie;
    private List<Genre> genre;
    private List<Cast> cast;
}
