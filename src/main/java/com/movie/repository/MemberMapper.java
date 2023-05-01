package com.movie.repository;

import org.apache.ibatis.annotations.Mapper;

import com.movie.model.member.Member;

@Mapper
public interface MemberMapper {
	
    void saveMember(Member member);
    
    Member findMember(String member_id);
    
}
