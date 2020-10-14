package com.community.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SecondCommentModel {
    private int c_id;
    private int b_id;
    private int recomment_id;
    private String c_content;
    private Date c_date;
    private String userId;
    private byte[] profile;
}
