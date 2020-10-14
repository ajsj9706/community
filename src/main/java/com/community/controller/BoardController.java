package com.community.controller;

import com.community.model.*;
import com.community.service.BoardService;
import com.community.util.CheckUtil;
import com.community.util.LoginUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;
import java.util.UUID;

import static org.apache.commons.io.FilenameUtils.getExtension;

@RestController
@RequestMapping(value = "/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    //게시글 전부 가져오기
    @GetMapping(value = "/boardList")
    public List<BoardModel> boardList(){
        return boardService.getBoardList();
    }

    //내가쓴 글
    @GetMapping(value = "/myBoardList/{userId}")
    public List<BoardModel> myBoardList(@PathVariable String userId){
        return boardService.getMyBoardList(userId);
    }

    //게시글 작성 하기
    @PostMapping(value = "/community")
    public Integer insert(@RequestBody ViewModel viewModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.loginCheck(loginUserId, viewModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return  boardService.insert(viewModel);
    }

    //게시글 수정하기
    @PutMapping(value = "/community/{b_id}")
    public Integer update(@RequestBody ViewModel viewModel, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.loginCheck(loginUserId, viewModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return  boardService.update(viewModel, b_id);
    }

    //게시글 삭제하기
    @DeleteMapping(value = "/community/{b_id}")
    public Integer delete(@PathVariable int b_id, @RequestBody CheckUserModel checkUserModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.loginCheck(loginUserId, checkUserModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return boardService.delete(b_id);
    }

    //게시글 상세보기
    @GetMapping(value = "/view/{b_id}")
    public ViewModel view(@PathVariable int b_id){
        boardService.count(b_id);
        return boardService.getView(b_id);
    }

    //검색단어로 게시글 리스트 가져오기
    @GetMapping(value = "/search")
    public List<BoardModel> search(@RequestParam("word") String word){
        return boardService.search(word);
    }

    //조회수가 가장많은 것을 기준으로 출력하기
    @GetMapping(value = "/rank")
    public List<BoardModel> rank(){
        return boardService.getRank();
    }

    //사진 업로드
    @PostMapping("/upload")
    @ResponseBody
    public Integer upload(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletResponse response, HttpServletRequest request) throws IOException {
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.imageCheck(loginUserId, response, request) >= 1){
            return 0;
        }
        return boardService.imageUpload(multipartHttpServletRequest);
    }

    //게시글 수정시 사진 업로드
    @PostMapping("/upload/{b_id}")
    @ResponseBody
    public Integer insertUpload(MultipartHttpServletRequest multipartHttpServletRequest, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request) throws IOException {
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.imageCheck(loginUserId, response, request) >= 1){
            return 0;
        }
        return boardService.imageInsert(multipartHttpServletRequest, b_id);
    }

    //상세번호로 사가져오기 (바이너리 상태)
    @GetMapping(value = "/getImage/{b_id}")
    public List<ImageModel> get(@PathVariable int b_id){
        return boardService.getImage(b_id);
    }

//    //상세번호로 사가져오기 (사진 상태)
//    @CrossOrigin("*")
//    @GetMapping(value = "/getImage/{b_id}",  produces = MediaType.IMAGE_JPEG_VALUE)
//    public String get(@PathVariable int b_id, HttpServletResponse response) throws IOException{
//        ImageModel imageModel = boardService.getImage(b_id);
//
//        String result = imageModel.getFileName();
//
//        result = URLEncoder.encode(result, "UTF-8");
//        result = result.replaceAll("\\+", "%20");
//
//        byte[] input = imageModel.getImage();
//        try{
//            response.setHeader("Content-Disposition", "inline; fileName=\"" + result + "\";");
//            response.getOutputStream().write(input);
//            response.getOutputStream().flush();
//            response.getOutputStream().close();
//
//        }catch(Exception e){
//            e.printStackTrace();
//        }
//        return "가져왓음";
//    }

    //다운로드
    @GetMapping(value = "/download/{i_id}")
    public String download(@PathVariable int i_id, HttpServletResponse response) throws IOException {
        ImageModel imageModel = boardService.getViewImage(i_id);
        String result = imageModel.getFileName();

        result = URLEncoder.encode(result, "UTF-8");
        result = result.replaceAll("\\+", "%20");

        byte[] input = imageModel.getImage();
        try{
            response.setContentType("application/octet-stream");
            response.setContentLength(input.length);
            response.setHeader("Content-Disposition", "attachment; fileName=\"" + result + "\";");
            response.setHeader("Content-Transfer-Encoding", "binary");
            response.getOutputStream().write(input);
            response.getOutputStream().flush();
            response.getOutputStream().close();

        }catch(Exception e){
            e.printStackTrace();
        }
        return "야호!";
    }

    @DeleteMapping(value = "/{i_id}")
    public Integer deleteImage(@PathVariable("i_id") int i_id, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.imageCheck(loginUserId, response, request) >= 1){
            return 0;
        }
        return boardService.deleteImage(i_id);
    }

    @PostMapping(value = "/test")
    public Integer test(MultipartHttpServletRequest multipartHttpServletRequest) throws IOException {
        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("files");

        String genId = UUID.randomUUID().toString();

        for(MultipartFile files : multipartFiles){
            String saveFileName = genId + "." + getExtension(files.getOriginalFilename());

            System.out.println("file:"+files);
            System.out.println("getOriginalFilename:"+files.getOriginalFilename());
            System.out.println("saveFileName:"+saveFileName);
            System.out.println("-------------");
        }

        return 0;
    }
}