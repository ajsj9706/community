package com.community.controller;


import com.community.model.CommentModel;
import com.community.model.CheckUserModel;
import com.community.service.CommentService;
import com.community.util.CheckUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    //댓글 입력
    @PostMapping
    public Integer insert(@RequestBody CommentModel commentModel, HttpServletResponse response, HttpServletRequest request){
//        String status = CheckUtil.loginCheck(commentModel.getUserId(), response, request);
//        if(status.equals("1")){
//            return 0;
//        }else{
//            commentModel.setUserId(status);
//        }
        return commentService.insert(commentModel);
    }

    //답글달기
    @PostMapping(value = "/second")
    public Integer secondInsert(@RequestBody CommentModel commentModel, HttpServletResponse response, HttpServletRequest request){
//        String status = CheckUtil.loginCheck(commentModel.getUserId(), response, request);
//        if(status.equals("1")){
//            return 0;
//        }else{
//            commentModel.setUserId(status);
//        }
        return commentService.secondInsert(commentModel);
    }

    //댓글 수정
    @PutMapping
    public Integer update(@RequestBody CommentModel commentModel, HttpServletResponse response, HttpServletRequest request){
        String status = CheckUtil.loginCheck(commentModel.getUserId(), response, request);
        if(status.equals("1")){
            return 0;
        }else{
            commentModel.setUserId(status);
        }
        return commentService.update(commentModel);
    }

    //댓글 삭제
    @DeleteMapping(value = "/{c_id}")
    public Integer delete(@PathVariable int c_id, @RequestBody CheckUserModel checkUserModel, HttpServletResponse response, HttpServletRequest request){
        String status = CheckUtil.loginCheck(checkUserModel.getUserId(), response, request);
        if(status.equals("1")){
            return 0;
        }else{
            checkUserModel.setUserId(status);
        }
        return commentService.delete(c_id);
    }
}
