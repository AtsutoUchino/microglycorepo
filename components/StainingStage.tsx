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
        // const hostName = "http://localhost:3000/";
        const hostName = "https://microglycorepo.vercel.app/";
    useEffect(() => {
        fetch(`${hostName}json/template/staining/${id}.json`, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    //Taxonomy ComboBox???????????????Taxonomy ID???State?????????
    const [selectedGenusId, setSelectedGenusId] = useState<string>(
        GenusResultList[0].genusId
    );
    //????????????Genus???Species?????????Ref?????????
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
    //ComboBox???????????????TaxonomyID???State?????????
    const [selectedSpeciesId, setSelectedSpeciesId] = useState(
        GenusResultList[0].species[0].speciesId
    );

    const onGenusComboBoxChangeHandler = (genusId: string) => {
        //????????????TaxonomyID???State?????????
        setSelectedGenusId(genusId);

        //????????????Genus???Species??????
        const selectedGenusSpecies = GenusResultList.filter(
        (d) => d.genusId === genusId
        )[0].species;

        //????????????Genus????????????Species???State?????????
        setSelectedSpeciesId(selectedGenusSpecies[0].speciesId);

        //????????????Spcies???Ref?????????
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
        console.log(uri);
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
                alt="staining image"
                width={500}
                height={500}
                />
            <Text
                text={taxonText}
                fontSize={50}
                fontStyle='bold italic'
                x={30}
                y={30}
                alt="taxonomy text"
                />
            </Layer>
            </Stage>
        </>
    )
}

export default Staining