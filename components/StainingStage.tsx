import React, {useState, useEffect, useRef} from 'react'
import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';
import useImage from 'use-image'
import { useRouter } from "next/router";
import ComboBox, { ComboBoxItem } from "components/ComboBox";
import Button from '@mui/material/Button';
import styles from 'styles/taxonomy.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" ;
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload" ;

interface TaxonomyResult {
    genusId: string;
    genusTitle: string;
    species: {
        speciesId: string;
        speciesText: string;
    }[];
}

const GenusResultList: TaxonomyResult[] = [
    {
        genusId: "1",
        genusTitle: "Bifidobacterium",
        species: [
        {
            speciesId: "1",
            speciesText: "Bifidobacterium bifidum"
        },
        {
            speciesId: "2",
            speciesText: "Bifidobacterium longum"
        }
        ]
    },
    {
        genusId: "2",
        genusTitle: "Campylobacter",
        species: [
        {
            speciesId: "1",
            speciesText: "Campylobacter jejuni"
        },
        {
            speciesId: "2",
            speciesText: "Campylobacter coli"
        }
        ]
    },
    {
        genusId: "3",
        genusTitle: "Mycobacterium",
        species: [
        {
            speciesId: "1",
            speciesText: "Mycobacterium abscessus"
        },
        {
            speciesId: "2",
            speciesText: " Mycobacterium tuberculosis"
        },
        {
            speciesId: "3",
            speciesText: "Mycobacterium kansasii"
        }
        ]
    }
];

function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const Staining = () => {
    const router = useRouter();
    console.log(router.query);
    const {id} = router.query;
    const [posts, setPosts] = useState<any>([])
    useEffect(() => {
        fetch(`http://localhost:3000/json/template/staining/${id}.json`, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
    },[])
    // console.log(posts);

    const [image] = useImage(posts.image)

    const [genusOptions] = useState<ComboBoxItem[]>(
        GenusResultList.map((d) => {
        return {
            id: d.genusId,
            value: d.genusTitle
        };
        })
    );
    //Taxonomy ComboBoxで選択中のTaxonomy IDをStateで管理
    const [selectedGenusId, setSelectedGenusId] = useState<string>(
        GenusResultList[0].genusId
    );
    //選択中のGenusのSpecies一覧をRefで管理
    const speciesOptionsRef = useRef(
        GenusResultList.filter(
        (d) => d.genusId === selectedGenusId
        )[0].species.map((d) => {
        return {
            id: d.speciesId,
            value: d.speciesText
        };
        })
    );
    //ComboBoxで選択中のTaxonomyIDをStateで管理
    const [selectedSpeciesId, setSelectedSpeciesId] = useState(
        GenusResultList[0].species[0].speciesId
    );

    const onGenusComboBoxChangeHandler = (genusId: string) => {
        //選択したTaxonomyIDをStateに指定
        setSelectedGenusId(genusId);

        //選択したGenusのSpecies一覧
        const selectedGenusSpecies = GenusResultList.filter(
        (d) => d.genusId === genusId
        )[0].species;

        //選択したGenusの先頭のSpeciesをStateに指定
        setSelectedSpeciesId(selectedGenusSpecies[0].speciesId);

        //選択したSpciesをRefに指定
        speciesOptionsRef.current = selectedGenusSpecies.map((d) => {
        return {
            id: d.speciesId,
            value: d.speciesText
        };
        });
    };
    const [taxonText, setTaxonText] = useState()
    const onClickTaxon = () => {
        // console.log(document.hrefform[1].textContent);
        
        if (document){
            {/* @ts-ignore */}
            const taxonText = document.hrefform[1].textContent
            setTaxonText(taxonText);
        }
    };

    const stageRef = React.useRef(null);
    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        downloadURI(uri, 'stage.png');
    };

    return (
        <>
            <div className={styles.conmboBox}>
                <ComboBox
                    inputLabel="Genus"
                    items={genusOptions}
                    value={selectedGenusId}
                    defaultValue={genusOptions[0].id}
                    onChange={(selected) => onGenusComboBoxChangeHandler(selected)}
                />
                <ComboBox
                    inputLabel="Species"
                    items={speciesOptionsRef.current}
                    value={selectedSpeciesId}
                    defaultValue={"1"}
                    onChange={(selected) => setSelectedSpeciesId(selected)}
                />
                <Button variant="outlined" size="large" onClick={onClickTaxon}>
                    Select
                </Button>
            </div>
            <FontAwesomeIcon icon={faDownload} onClick={handleExport} />
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ border: '1px solid grey' }}
                ref={stageRef}
                >
            <Layer>
            <Image
                image={image}
                x={20}
                y={100}
                />
            <Text
                text={taxonText}
                fontSize={50}
                fontStyle='bold italic'
                x={30}
                y={10}
                />
            </Layer>
            </Stage>
        </>
    )
}

export default Staining