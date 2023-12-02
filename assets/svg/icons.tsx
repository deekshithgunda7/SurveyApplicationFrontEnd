import SvgIcon from '@material-ui/core/SvgIcon';
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

interface SVGProps {
    fontSize: string;
    fill?:string;
    stroke?:string;
}

interface ActionSVGProps {
    onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            addIcon: {
                verticalAlign: "middle",
                display: "inline-block",
                marginTop: "8px",
                marginRight: "2px",
                cursor: "pointer",
                "& svg": {
                    fontSize: "20px",
                },

            },
            deleteIcon: {
                verticalAlign: "middle",
                display: "inline-block",
                marginTop: "8px",
                // marginRight: "1px",
                cursor: "pointer",
                "& svg": {
                    fontSize: "20px",
                },

            },
            text: {
                // marginRight: "15px",
                
                textAlign: "left",
                verticalAlign: "middle",
                display: "inline-block",
                cursor: "pointer",
            },
        Add: {
            cursor: "pointer",
            color: "#5c5c5c",
            '&:hover': {
                "& path": {
                    d: "path('M9,0V18m9-9H0')",
                    fillRule: "#1a1a1a",
                     strokeWidth: 2,
                },
                color: "#1a1a1a",
                fontWeight: "bold"
            },
        },
        Delete:{
            cursor: "pointer",
            color: "#5c5c5c",
            '&:hover': {
                "& path": {
                    d: "path('M1.5,2.5l2,15H10A5.08,5.08,0,0,0,15.25,13L16.5,2.5ZM0,2.5H18M5.5,2.5V.5h7v2')",
                    fillRule: "#1a1a1a",
                    strokeWidth: 2,
                },
                color: "#1a1a1a",
                fontWeight: "bold"
            },
        }

        }
    ));

export const AddSVG: React.FC<ActionSVGProps> = ({onClick}) => {
    const classes = useStyles();
    return (
        <span onClick={onClick} className={classes.Add}>
            <span className={classes.addIcon} >
                <SvgIcon >
                    <path id="add" d="M9,0V18m9-9H0" fill="none" stroke="#000"/>
                </SvgIcon>
            </span>
            <span className={classes.text} >
                Add
            </span>
        </span>
    )
}

export const DeleteSVG: React.FC = () => {
    const classes = useStyles();
    return (
        <span className={classes.Delete}>
            <span className={classes.deleteIcon}>
                <SvgIcon>
                    <g id="ic_delete" >
                        <path id="delete"
                              d="M1.5,2.5l2,15H10A5.08,5.08,0,0,0,15.25,13L16.5,2.5ZM0,2.5H18M5.5,2.5V.5h7v2"
                              fill="none" stroke="#000"
                              />
                    </g>
                </SvgIcon>
            </span>
            <span className={classes.text}>
                Delete
            </span>
        </span>
    )
}
export const ReportSVG = ()=>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg"   fill="none"  width={18}
             height={19} viewBox="0 0 18 18">
            <path
                stroke="#ffffff"
                d="M1 8.5h3m-3 6h3m-3-11h3M2.5.5h14v11.77c0 2.888-2.09 5.23-4.667 5.23H2.5V.5z"
                vectorEffect="non-scaling-stroke"
            ></path>
        </svg>
    );
}
export const HomeSVG = () => {
    return (
        <svg
            width={18}
            height={19}
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                clipRule="evenodd"
                d="M17.5 8.038L9 1.5.5 8.038V18.5h11.77a5.19 5.19 0 005.23-5.23V8.037z"
                stroke="#ffffff"
            />
        </svg>
    )
}
// export const HomeSVG = ({fontSize}: SVGProps) => {
//     const iconStyles = {
//         fontSize: fontSize,
//     };
//     return (
//         <SvgIcon style={iconStyles}>
//             <path id="home-2" data-name="home"
//                   d="M17,8a.994.994,0,0,1-.6-.2L9,2.25,1.6,7.8A1,1,0,1,1,.4,6.2l8-6A1,1,0,0,1,9.6.2l8,6A1,1,0,0,1,17,8ZM9,5l7,5v5a2,2,0,0,1-2,2H11V12H7v5H4.013A2.013,2.013,0,0,1,2,14.987V10Z"
//                   transform="translate(0 0)" />
//         </SvgIcon>
//     )
// }


export const AppsSVG = ({fontSize}: SVGProps) => {
    const iconStyles = {
        fontSize: fontSize,
    };
    return (
        <SvgIcon style={iconStyles}>
            <path id="Union_6" data-name="Union 6"
                  d="M11.286,18a1,1,0,0,1-1-1V11.286a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1V17a1,1,0,0,1-1,1ZM1,18a1,1,0,0,1-1-1V11.286a1,1,0,0,1,1-1H6.714a1,1,0,0,1,1,1V17a1,1,0,0,1-1,1ZM11.286,7.715a1,1,0,0,1-1-1V1a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1V6.714a1,1,0,0,1-1,1ZM1,7.715a1,1,0,0,1-1-1V1A1,1,0,0,1,1,0H6.714a1,1,0,0,1,1,1V6.714a1,1,0,0,1-1,1Z"
                 />
            <g id="Path_1" data-name="Path 1" transform="translate(3.13 4.093)">
                <path
                    d="M 11.52750778198242 16.40703201293945 L 9.14610767364502 16.40703201293945 C 8.755447387695312 16.40703201293945 8.42421817779541 16.12688255310059 8.358497619628906 15.74090194702148 L 8.357327461242676 15.73398208618164 L 8.356337547302246 15.72703266143799 L 8.171504020690918 14.42083549499512 C 7.959095478057861 14.31660842895508 7.752333641052246 14.19596385955811 7.552966594696045 14.0599308013916 L 6.326717853546143 14.5548620223999 C 6.231737613677979 14.59286212921143 6.133227825164795 14.61184215545654 6.032497882843018 14.61184215545654 C 5.750407695770264 14.61184215545654 5.486657619476318 14.45959186553955 5.344167709350586 14.21451187133789 L 4.1526780128479 12.15026187896729 C 3.954297780990601 11.80113220214844 4.036867618560791 11.37196254730225 4.347327709197998 11.12685203552246 L 5.387150287628174 10.31125354766846 C 5.37660026550293 10.18334674835205 5.371677875518799 10.06741523742676 5.371677875518799 9.953512191772461 C 5.371677875518799 9.839609146118164 5.37660026550293 9.723679542541504 5.387150287628174 9.595772743225098 L 4.348577976226807 8.781162261962891 L 4.344807624816895 8.778202056884766 L 4.341097831726074 8.775181770324707 C 4.034327983856201 8.524922370910645 3.95541787147522 8.096042633056641 4.153467655181885 7.755402088165283 L 5.343378067016602 5.693871974945068 C 5.486197948455811 5.448212146759033 5.750357627868652 5.296452045440674 6.033547878265381 5.296452045440674 C 6.130477905273438 5.296452045440674 6.225607872009277 5.31383228302002 6.316298007965088 5.348092079162598 L 6.32152795791626 5.350072383880615 L 6.326717853546143 5.35216236114502 L 7.551880836486816 5.846655368804932 C 7.749000072479248 5.71169900894165 7.956159591674805 5.591080665588379 8.171543121337891 5.48585033416748 L 8.356337547302246 4.17998218536377 L 8.357327461242676 4.173032283782959 L 8.358497619628906 4.166121959686279 C 8.42421817779541 3.780142307281494 8.755457878112793 3.500002145767212 9.14610767364502 3.500002145767212 L 11.52750778198242 3.500002145767212 C 11.91175746917725 3.500002145767212 12.2434778213501 3.77589225769043 12.31626796722412 4.156002044677734 L 12.31854820251465 4.167942047119141 L 12.32025814056396 4.17998218536377 L 12.50510025024414 5.486190795898438 C 12.71749687194824 5.590415477752686 12.92425537109375 5.711054801940918 13.12362766265869 5.847094535827637 L 14.34987831115723 5.35216236114502 C 14.44487762451172 5.314162254333496 14.54337787628174 5.295182228088379 14.64409828186035 5.295182228088379 C 14.92618751525879 5.295182228088379 15.18993759155273 5.447432041168213 15.33242797851562 5.692512035369873 L 16.52392768859863 7.756762027740479 C 16.72229766845703 8.105912208557129 16.63971710205078 8.535072326660156 16.32926750183105 8.780172348022461 L 15.28649997711182 9.596152305603027 C 15.29703426361084 9.723955154418945 15.30194759368896 9.839756965637207 15.30194759368896 9.953512191772461 C 15.30194759368896 10.06741523742676 15.29702568054199 10.18334579467773 15.28647518157959 10.31125354766846 L 16.32503700256348 11.12586212158203 L 16.32880783081055 11.12882232666016 L 16.33251762390137 11.13184261322021 C 16.63929748535156 11.38210201263428 16.71820831298828 11.81098175048828 16.5201587677002 12.15162181854248 L 15.33024787902832 14.2131519317627 C 15.18739795684814 14.45882225036621 14.92323780059814 14.61057186126709 14.64005756378174 14.61057186126709 C 14.54312801361084 14.61057186126709 14.44800758361816 14.5931921005249 14.35731792449951 14.55893230438232 L 14.35208797454834 14.55695247650146 L 14.34689807891846 14.5548620223999 L 13.12174510955811 14.06036949157715 C 12.92461395263672 14.19533729553223 12.71749114990234 14.31593704223633 12.50207233428955 14.42117977142334 L 12.3172779083252 15.72704219818115 L 12.31629753112793 15.73397254943848 L 12.31511783599854 15.7408618927002 C 12.24942779541016 16.12687301635742 11.91818809509277 16.40703201293945 11.52750778198242 16.40703201293945 Z M 10.33680820465088 8.369782447814941 C 9.46353816986084 8.369782447814941 8.753077507019043 9.080242156982422 8.753077507019043 9.953512191772461 C 8.753077507019043 10.8267822265625 9.46353816986084 11.53724193572998 10.33680820465088 11.53724193572998 C 11.21007823944092 11.53724193572998 11.9205379486084 10.8267822265625 11.9205379486084 9.953512191772461 C 11.9205379486084 9.080242156982422 11.21007823944092 8.369782447814941 10.33680820465088 8.369782447814941 Z"
                    stroke="none"/>
                <path
                    d="M 11.52750778198242 15.90703201293945 C 11.67634773254395 15.90703201293945 11.7983980178833 15.7968921661377 11.8222074508667 15.656982421875 L 12.04546737670898 14.07930183410645 C 12.4086275100708 13.92748260498047 12.74500751495361 13.73102188110352 13.05161762237549 13.49287223815918 L 14.53403759002686 14.09120178222656 C 14.56857204437256 14.10424995422363 14.60449600219727 14.11056995391846 14.64006614685059 14.11057090759277 C 14.74246501922607 14.11057281494141 14.84196662902832 14.05820178985596 14.89720821380615 13.96320247650146 L 16.0879077911377 11.90031242370605 C 16.16232872009277 11.77231216430664 16.12957763671875 11.61156177520752 16.01645851135254 11.51928234100342 L 14.76027774810791 10.5339822769165 C 14.78408813476562 10.34347248077393 14.80194759368896 10.14998245239258 14.80194759368896 9.953512191772461 C 14.80194759368896 9.757041931152344 14.78407764434814 9.563551902770996 14.76027774810791 9.373042106628418 L 16.01943778991699 8.387742042541504 C 16.1325569152832 8.298432350158691 16.16529846191406 8.137692451477051 16.09088706970215 8.006711959838867 L 14.90017795562744 5.943822383880615 C 14.84513473510742 5.84915018081665 14.74611759185791 5.795186519622803 14.64409351348877 5.795186519622803 C 14.60817718505859 5.795186519622803 14.57189559936523 5.801871299743652 14.53701782226562 5.815822124481201 L 13.05458831787109 6.414152145385742 C 12.74797821044922 6.178982257843018 12.41160774230957 5.979542255401611 12.04844760894775 5.827732086181641 L 11.82518768310547 4.250041961669922 C 11.7983980178833 4.110142230987549 11.67634773254395 4.000002384185791 11.52750778198242 4.000002384185791 L 9.14610767364502 4.000002384185791 C 8.997267723083496 4.000002384185791 8.875227928161621 4.110142230987549 8.851408004760742 4.250041961669922 L 8.628148078918457 5.827732086181641 C 8.264987945556641 5.979542255401611 7.928607940673828 6.17601203918457 7.622007846832275 6.414152145385742 L 6.139577865600586 5.815822124481201 C 6.105043888092041 5.802774429321289 6.069119453430176 5.796453475952148 6.033549785614014 5.796453475952148 C 5.931150913238525 5.796453475952148 5.831651210784912 5.848822116851807 5.77641773223877 5.943822383880615 L 4.585717678070068 8.006711959838867 C 4.511297702789307 8.134712219238281 4.544037818908691 8.295462608337402 4.657157897949219 8.387742042541504 L 5.913347721099854 9.373042106628418 C 5.889537811279297 9.563551902770996 5.871677875518799 9.757041931152344 5.871677875518799 9.953512191772461 C 5.871677875518799 10.14998245239258 5.889537811279297 10.34347248077393 5.913347721099854 10.5339822769165 L 4.657157897949219 11.51928234100342 C 4.544037818908691 11.60859203338623 4.511297702789307 11.76933193206787 4.585717678070068 11.90031242370605 L 5.77641773223877 13.96320247650146 C 5.831460475921631 14.05787372589111 5.930474758148193 14.11184215545654 6.032498836517334 14.11184215545654 C 6.068415641784668 14.11184215545654 6.104700565338135 14.10515594482422 6.139577865600586 14.09120178222656 L 7.622007846832275 13.49287223815918 C 7.928607940673828 13.72804260253906 8.264987945556641 13.92748260498047 8.628157615661621 14.07930183410645 L 8.851408004760742 15.656982421875 C 8.875227928161621 15.7968921661377 8.997267723083496 15.90703201293945 9.14610767364502 15.90703201293945 L 11.52750778198242 15.90703201293945 M 10.33680820465088 7.869781970977783 C 11.48881816864014 7.869781970977783 12.4205379486084 8.801511764526367 12.4205379486084 9.953512191772461 C 12.4205379486084 11.10551261901855 11.48881816864014 12.03724193572998 10.33680820465088 12.03724193572998 C 9.184807777404785 12.03724193572998 8.253077507019043 11.10551261901855 8.253077507019043 9.953512191772461 C 8.253077507019043 8.801511764526367 9.184807777404785 7.869781970977783 10.33680820465088 7.869781970977783 M 11.52750778198242 16.90703201293945 L 9.14610767364502 16.90703201293945 C 8.51088809967041 16.90703201293945 7.972357749938965 16.4518928527832 7.865597724914551 15.82482242584229 L 7.863237857818604 15.81098175048828 L 7.861268043518066 15.79709243774414 L 7.712396621704102 14.74503612518311 C 7.640688896179199 14.70531845092773 7.569650173187256 14.66386890411377 7.499387264251709 14.62074851989746 L 6.513857841491699 15.01852226257324 C 6.358047962188721 15.08084201812744 6.197077751159668 15.11184215545654 6.032497882843018 15.11184215545654 C 5.572968006134033 15.11184215545654 5.143578052520752 14.86430263519287 4.91190767288208 14.46582221984863 L 3.719637870788574 12.40021228790283 L 3.71793794631958 12.39727210998535 L 3.716257810592651 12.39432239532471 C 3.396647930145264 11.83180236816406 3.531747817993164 11.13371181488037 4.037497997283936 10.73441219329834 L 4.873517990112305 10.07866859436035 C 4.87233304977417 10.03756999969482 4.871677875518799 9.99576473236084 4.871677875518799 9.953512191772461 C 4.871677875518799 9.911259651184082 4.87233304977417 9.869457244873047 4.873517990112305 9.82835865020752 L 4.039998054504395 9.174582481384277 L 4.032457828521729 9.168672561645508 L 4.02503776550293 9.162611961364746 C 3.52663779258728 8.75603199005127 3.398857831954956 8.05852222442627 3.72121787071228 7.504082202911377 L 4.910337924957275 5.44392204284668 C 5.143117904663086 5.043512344360352 5.5729079246521 4.796452045440674 6.033547878265381 4.796452045440674 C 6.191097736358643 4.796452045440674 6.345717906951904 4.824692249298096 6.493107795715332 4.880402088165283 L 6.503527641296387 4.884332180023193 L 6.513857841491699 4.88850212097168 L 7.498197078704834 5.28579568862915 C 7.568640232086182 5.242619037628174 7.640102386474609 5.20103645324707 7.712518215179443 5.161087989807129 L 7.861268043518066 4.109932422637939 L 7.863237857818604 4.09603214263916 L 7.865597724914551 4.082192420959473 C 7.972357749938965 3.455132246017456 8.510897636413574 3.000002145767212 9.14610767364502 3.000002145767212 L 11.52750778198242 3.000002145767212 C 12.15125751495361 3.000002145767212 12.68950748443604 3.446622133255005 12.80733776092529 4.061962127685547 L 12.81191825866699 4.085852146148682 L 12.81532764434814 4.109932422637939 L 12.96420669555664 5.16200065612793 C 13.03591346740723 5.201717376708984 13.10693836212158 5.243159294128418 13.17720222473145 5.28627872467041 L 14.16273784637451 4.88850212097168 C 14.31854820251465 4.82618236541748 14.47951793670654 4.795182228088379 14.64409828186035 4.795182228088379 C 15.10362815856934 4.795182228088379 15.53301811218262 5.042722225189209 15.76468753814697 5.441202163696289 L 16.95696830749512 7.506802082061768 L 16.95867729187012 7.509772300720215 L 16.96037864685059 7.512752056121826 C 17.27993774414062 8.075262069702148 17.14482879638672 8.773332595825195 16.63909721374512 9.172612190246582 L 15.80012893676758 9.829116821289062 C 15.80130100250244 9.869978904724121 15.80194759368896 9.911519050598145 15.80194759368896 9.953512191772461 C 15.80194759368896 9.99576473236084 15.80129241943359 10.03757953643799 15.8001070022583 10.07867813110352 L 16.63361740112305 10.73245239257812 L 16.64115715026855 10.73835182189941 L 16.64857864379883 10.74441242218018 C 17.1469783782959 11.15099239349365 17.27475738525391 11.84850215911865 16.95240783691406 12.4029426574707 L 15.76328754425049 14.46310234069824 C 15.53045749664307 14.8635425567627 15.10067749023438 15.11057186126709 14.64006805419922 15.11057186126709 C 14.48251819610596 15.11057186126709 14.3278980255127 15.08233261108398 14.18050765991211 15.02662181854248 L 14.17008781433105 15.02269172668457 L 14.15975761413574 15.01852226257324 L 13.17542457580566 14.62122821807861 C 13.10498237609863 14.66440486907959 13.03351593017578 14.70598888397217 12.96109962463379 14.74593925476074 L 12.81234741210938 15.7971019744873 L 12.810378074646 15.81095218658447 L 12.80803775787354 15.82475185394287 C 12.70130825042725 16.45186233520508 12.16276741027832 16.90703201293945 11.52750778198242 16.90703201293945 Z M 10.33680820465088 8.869782447814941 C 9.739237785339355 8.869782447814941 9.253077507019043 9.355941772460938 9.253077507019043 9.953512191772461 C 9.253077507019043 10.55108261108398 9.739237785339355 11.03724193572998 10.33680820465088 11.03724193572998 C 10.93437767028809 11.03724193572998 11.4205379486084 10.55108261108398 11.4205379486084 9.953512191772461 C 11.4205379486084 9.355941772460938 10.93437767028809 8.869782447814941 10.33680820465088 8.869782447814941 Z"
                    stroke="none"/>
            </g>
        </SvgIcon>
    )
}


export const GroupsSVG = ({fontSize}: SVGProps) => {
    const iconStyles = {
        fontSize: fontSize,
    };
    return (
        <SvgIcon style={iconStyles}>
            <g id="ic_group" transform="translate(0.5 0.5)">
                <path id="Union_5" data-name="Union 5"
                      d="M121.113,27.9h-6.591A1.363,1.363,0,0,1,113,26.583a5.327,5.327,0,1,1,10.654,0,1.363,1.363,0,0,1-1.522,1.316Zm-5.45-10.236a2.664,2.664,0,1,1,2.664,2.664A2.664,2.664,0,0,1,115.664,17.663Z"
                      transform="translate(-113 -14.06)"  stroke="rgba(0,0,0,0)" strokeWidth="1"/>
                <path id="Path"
                      d="M10.654,5.327A5.327,5.327,0,1,0,0,5.327,1.362,1.362,0,0,0,1.522,6.642h7.61a1.362,1.362,0,0,0,1.522-1.315"
                      transform="translate(9.993 7.197)" />
                <path id="Path-2" data-name="Path"
                      d="M2.664,5.327A2.664,2.664,0,1,1,5.327,2.664,2.664,2.664,0,0,1,2.664,5.327"
                      transform="translate(12.657 0.94)"/>
                <path id="ic_user"
                      d="M10.445,16.607H1.959A1.754,1.754,0,0,1,0,14.914a6.859,6.859,0,0,1,13.718,0,1.754,1.754,0,0,1-1.96,1.693ZM3.429,3.429a3.429,3.429,0,1,1,3.43,3.43A3.43,3.43,0,0,1,3.429,3.429Z"
                      transform="translate(3.317)" stroke="#fff" strokeWidth="1"/>
            </g>
        </SvgIcon>
    )
}
export const SchedulesSVG = ({fontSize,fill,stroke}:SVGProps) => {
    // const iconStyles = {
    //     fontSize: fontSize,
    // };
    return (
        <svg  width={fontSize}
              height={fontSize}
              viewBox="0 0 18 18"
              fill={fill?fill:"none"}
              xmlns="http://www.w3.org/2000/svg" >
            <path
                stroke={stroke?stroke:"#ffffff"}
                d="M1 7.5h16M3.5 0v3m11-3v3m-14 .5h17v8.727c0 2.912-2.342 5.273-5.23 5.273H.5v-14z"
                vectorEffect="non-scaling-stroke"
            ></path>
        </svg>
    )
}

export const AccountsSVG= ({fontSize,fill,stroke}:SVGProps) => {
    return (
        <svg
            width={fontSize}
            height={fontSize}
            viewBox="0 0 18 18"
            fill={fill?fill:"none"}
            xmlns="http://www.w3.org/2000/svg"
        >

            <path
            clipRule="evenodd"
            vectorEffect="non-scaling-stroke"
            d="M9.66 13.354a15.424 15.424 0 01-.006-.439c0-1.886-1.6-3.415-3.573-3.415H4.073C2.1 9.5.5 11.029.5 12.915V14.5h8.028m5.4-2H11.92c-1.973 0-3.42 1.53-3.42 3.415V17.5h9v-1.585c0-1.885-1.6-3.415-3.573-3.415zM8.5 3.5a3 3 0 11-6 0 3 3 0 016 0zm8 4a3 3 0 11-6 0 3 3 0 016 0z"
            stroke={stroke?stroke:"#ffffff"}
            />

        </svg>
    )
}
export const InforSVG= () =>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 34" width={34} height={34}>
            <path
                fill="#666"
                d="M34.511 31.131c.15.085.273.208.358.358a1.046 1.046 0 010 1.014.981.981 0 01-.366.361 1.023 1.023 0 01-1.01 0 .981.981 0 01-.493-.866c0-.176.045-.35.132-.504a.975.975 0 01.361-.361 1.043 1.043 0 011.018 0v-.002zm-.072 1.624a.858.858 0 00.426-.76.924.924 0 00-.113-.443.825.825 0 00-.309-.311.912.912 0 00-.886 0 .846.846 0 00-.313.315.913.913 0 000 .88.856.856 0 00.75.432.853.853 0 00.445-.113zm.008-.718a.348.348 0 01-.175.129l.257.398h-.195l-.235-.362h-.308v.362h-.193v-1.132h.453c.12-.006.24.03.335.104a.35.35 0 01.129.28.387.387 0 01-.063.22h-.005zm-.2-.052a.2.2 0 00.075-.167.195.195 0 00-.075-.165.34.34 0 00-.21-.059h-.249v.45h.248a.332.332 0 00.211-.059z"
            ></path>
            <path fill="#D5000E" d="M32 1H0v32h32V1z"></path>
            <path
                fill="#fff"
                d="M2.857 20.773h2.024v-6.56H2.857v6.56zm3.105 0h2.025v-3.267c0-.85.162-1.673 1.214-1.673 1.053 0 1.053.97 1.053 1.727v3.214h2.025v-3.619c0-1.755-.378-3.1-2.43-3.1-1.603 0-1.947.76-1.947.76v-.602h-1.94v6.56zm7.397 0h2.025v-4.936h1.492v-1.624h-1.492v-1.04c0-.863.323-1.066.972-1.066.227.004.45.05.661.135l.094-1.714a4.889 4.889 0 00-1.188-.121c-2.2 0-2.564 1.214-2.564 2.646v7.72zm7.431-6.717c-2.025 0-3.645 1.35-3.645 3.443 0 2.094 1.62 3.444 3.645 3.444s3.644-1.35 3.644-3.444c0-2.093-1.62-3.443-3.644-3.443zm0 5.102c-1.012 0-1.62-.675-1.62-1.66 0-.987.608-1.66 1.62-1.66s1.62.674 1.62 1.66c0 .984-.608 1.66-1.62 1.66zm4.438 1.62h2.023v-2.674c0-1.308.19-2.416 1.729-2.416.293.004.583.05.863.135v-1.776c-2.066-.09-2.592.739-2.592.739v-.574h-2.023v6.566zm-22.371-7.64h2.024v-2.474l-2.024 1.388v1.085z"
            ></path>
        </svg>
    );
}