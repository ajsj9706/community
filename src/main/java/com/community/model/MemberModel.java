package com.community.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberModel {
    private String encode;
    private String userId;
    private String userPw;
    private String file_path;
    private String file_name;
}
