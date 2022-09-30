import styles from 'styles/taxonomy.module.css'
import React, { useState, useRef } from "react";
import ComboBox, { ComboBoxItem } from "components/ComboBox";

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

const Taxonomy = () => {
    //ComboBoxのアイテムとするTaxonomy一覧をStateで管理
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
    //質問ComboBoxで選択中のTaxonomyIDをStateで管理
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

    const onClickTaxon = () => {
        // console.log(document.hrefform[1].textContent);
        if (document){
            location.href=document.hrefform[1].textContent;
        }
    };

    return (
        <div className={styles.container}>
            <h1>Taxonomy</h1>
            <br />
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
                <input type="button" onClick={onClickTaxon} value="create"></input>
            </div>
        </div>
    );
};

export default Taxonomy;