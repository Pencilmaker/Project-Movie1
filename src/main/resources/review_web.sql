create table movie(
    movie_id number(10) primary key,
    title varchar2(255),
    overview varchar2(4000),
    poster_path varchar2(1000),
    vote_average number(10)
);

create table member(
    member_id varchar(100) primary key,
    password varchar(20) not null,
    member_name varchar(20) not null,
    birth number(8) not null
);

create table genre(
    movie_id number(10) references movie(movie_id),
    genre_id number(5),
    genre_name varchar2(100)
);

create table reply(
    reply_id number primary key,
    movie_id number REFERENCES movie(movie_id),
    member_id REFERENCES member(member_id),
    content varchar2(1000),
    created_time date default sysdate
);

create table favorites (
    movie_id number(10),
    member_id varchar2(100)
);

select * from member;
select * from genre;
select * from movie;
select * from reply;
select * from favorites;



drop table movie;
drop table genre;
drop table reply;
drop table favorites;

commit;