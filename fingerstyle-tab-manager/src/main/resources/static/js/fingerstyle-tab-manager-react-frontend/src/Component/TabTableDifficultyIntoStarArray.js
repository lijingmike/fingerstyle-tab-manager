import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function TabTableDifficultyIntoStarArray({ difficulty }) {
    let stars = null;

    switch (difficulty.toLowerCase()) {
        case "beginner":
            stars = 
                [
                    <StarIcon key={0}/>,
                    <StarBorderIcon key={1}/>,
                    <StarBorderIcon key={2}/>
                ];
                break;

            case "intermediate":
                stars = 
                    [
                        <StarIcon key={0} />,
                        <StarIcon key={1} />,
                        <StarBorderIcon key={2} />
                    ];
                break;

            case "advanced":
                stars = 
                    [
                        <StarIcon key={0} />,
                        <StarIcon key={1} />,
                        <StarIcon key={2} />
                    ];
                break;

            default:
                stars = null;
    }

    return <div style={{ display: "flex", flexWrap: "nowrap" }}>{stars}</div>;
}