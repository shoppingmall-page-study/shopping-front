import Hafter from "../Header/HeaderAfter";

function UserModify(){
    return(
        <div>
            <div className="Header">
                <Hafter/>
                <h1>회원 수정</h1>
            </div>
            <div className="Content">
            <h1>회원 정보</h1>
            <p>이름 000</p>
            <p>배송주소 000</p>
            <p>닉네임 000</p>
            <p>전화번호 000</p>
            <button>회원 정보 수정</button>
            </div>
        </div>
    );
}
export default function UserModify
