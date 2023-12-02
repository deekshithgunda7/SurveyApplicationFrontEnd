import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';


interface SearchInputProps {
    placeHolder?:string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    search: string;
    onClick: () => void;
    width: string,
    height: string,
    borderRadius?:number
}

interface styleProps {
    width: string,
    height: string,
    borderRadius?:number
}

const useStyles = makeStyles((theme: Theme) => ({
        searchInput: (props: styleProps) => ({
            width: props.width,
            height: props.height,
            backgroundColor: "white",
            paddingLeft: "5px",
            paddingRight: "5px",
            borderRadius:props?.borderRadius
        })
    })
);


const SearchInput: React.FC<SearchInputProps> = ({ placeHolder,onChange, search, onClick, height, width,borderRadius}) => {
    const classes = useStyles({width: width, height: height,borderRadius:borderRadius});
    return (
        <div>
            <OutlinedInput
                placeholder={placeHolder}
                className={classes.searchInput}
                onChange={onChange}
                id="search"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                }
                value={search}
                endAdornment={
                    <InputAdornment position="end">
                        {search !== "" ? <CloseIcon onClick={onClick}/> : <></>}
                    </InputAdornment>
                }
            />
        </div>
    )
};

export default SearchInput;