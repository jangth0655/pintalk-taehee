package com.pintalk.common.entity;

import com.pintalk.account.entity.AccountHist;
import com.pintalk.user.entity.UserMember;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class Param extends BaseEntity {

    public Param getParamObject(Param param){
        return param;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/login")
    public Param getLoginParam(Param param){

        param.setId(param.getId());
        param.setPassword(param.getPassword());
        return param;
    }

    @RequestMapping(method = RequestMethod.GET, path = {"/userMemberList","/userMemberListForm"})
    public Param getUserMemberParam(Param param){

        param.setGender(param.getGender());
        param.setName(param.getName());
        param.setYear(param.getYear());
        param.setMonth(param.getMonth());
        param.setDay(param.getDay());
        param.setPhone1(param.getPhone1());
        param.setPhone2(param.getPhone2());
        param.setPhone3(param.getPhone3());
        param.setAddress(param.getAddress());
        param.setEmail(param.getEmail());
        param.setSignDateStart(param.getSignDateStart());
        param.setSignDateEnd(param.getSignDateEnd());
        param.setModifyDateStart(param.getModifyDateStart());
        param.setModifyDateEnd(param.getModifyDateEnd());
        param.setStatus(param.getStatus());
        param.setSaveStatus(param.getSaveStatus());

        return param;
    }

    @RequestMapping(method = RequestMethod.GET, path = {"/accountList","/accountListForm"})
    public Param getAccountParam(Param param){

        param.setUserMember(param.getUserMember());
        param.setFinTechUseNum(param.getFinTechUseNum());
        param.setAlias(param.getAlias());
        param.setBankCodeStd(param.getBankCodeStd());
        param.setBankCodeSub(param.getBankCodeSub());
        param.setBankName(param.getBankName());
        param.setSavingsBankName(param.getSavingsBankName());
        param.setHolderName(param.getHolderName());
        param.setHolderType(param.getHolderType());
        param.setType(param.getType());
        param.setAccountNo(param.getAccountNo());
        param.setInquiryAgreeYn(param.getInquiryAgreeYn());
        param.setInquiryAgreeDt(param.getInquiryAgreeDt());
        param.setTransferAgree_yn(param.getTransferAgree_yn());
        param.setTransferAgreeDt(param.getTransferAgreeDt());
        param.setState(param.getState());
        param.setCreateDt(param.getCreateDt());
        param.setModifyDt(param.getModifyDt());
//        param.setAccountHists(param.getAccountHists());

        return param;
    }


    private Integer no;             //?????? ?????? ??????

    private String id;              //?????? ?????????
    private String password;        //?????? ????????????
    private String name;            //?????? ??????
    private String ssn;             //?????? ????????????
    private String ssn1;            //?????? ????????????(?????????)
    private String ssn2;            //?????? ????????????(?????????)

    private String year;            //?????? ??????
    private String month;           //?????? ???
    private String day;             //?????? ???

    private String phone1;          //?????? ?????? ?????????
    private String phone2;          //?????? ?????? ????????????
    private String phone3;          //?????? ?????? ?????????
    private String email;           //?????? ?????????
    private String gender;          //?????? ??????
    private String address;         //?????? ?????? ??????
    private String address1;        //?????? ?????????
    private String address2;        //?????? ????????????
    private String jobKey;          //?????? ????????????
    private String status;          //?????? ??????
    private String saveStatus;      //?????? ?????????

    private String signDate;        // ????????????
    private String modifyDate;      // ???????????? ??????
    
    private String signDateStart;   // ???????????? ??????
    private String signDateEnd;     // ???????????? ???
    private String modifyDateStart; // ???????????? ??????
    private String modifyDateEnd;   // ???????????? ???

    private LocalDateTime reg_Date;
    private LocalDateTime update_Date;





    private UserMember userMember;
    private String finTechUseNum;
    private String alias;
    private String bankCodeStd;
    private String bankCodeSub;
    private String bankName;
    private String savingsBankName;
    private String HolderName;
    private String HolderType;
    private String type;
    private String accountNo;
    private String inquiryAgreeYn;
    private String inquiryAgreeDt;
    private String transferAgree_yn;
    private String transferAgreeDt;
    private String State;
    private String createDt;
    private String modifyDt;
    private List<AccountHist> accountHists = new ArrayList();
}
