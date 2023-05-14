package com.movie.model.member;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class MemberJoinForm {
    @Size(min = 4, max = 100)
    private String member_id;
    @Size(min = 4, max = 20)
    private String password;
    @NotBlank
    private String member_name;
    private String birth;
    private String email;
    private String question;
    private String answer;

    public static Member toMember(MemberJoinForm memberJoinForm) {
        Member member = new Member();
        member.setMember_id(memberJoinForm.getMember_id());
        member.setPassword(memberJoinForm.getPassword());
        member.setMember_name(memberJoinForm.getMember_name());
        member.setBirth(memberJoinForm.getBirth());
        member.setEmail(memberJoinForm.getEmail());
        member.setQuestion(memberJoinForm.getQuestion());
        member.setAnswer(memberJoinForm.getAnswer());
        return member;
    }
}
