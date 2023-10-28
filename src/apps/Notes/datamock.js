import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';


const d = EditorState.createWithContent(stateFromHTML(`

<h1>Rapport d'Observation: Visite Supervisée</h1>
<strong>Date:</strong> 19 octobre 2023<br />
<strong>Lieu:</strong> Centre de services sociaux de la Ville<br />
<strong>Intervenant social:</strong> M. Jean Dupont<br />
<strong>Parent observé:</strong> M. Paul Martin<br />
<strong>Enfant:</strong> Lucas Martin, 8 ans<br />
<hr />
<h2>Observations:</h2>
<ol>
  <li>
    <strong>Début de la visite (14h00):</strong>
    <ul>
      <li>Lucas est arrivé avec une légère appréhension, mais semblait heureux de voir son père.</li>
      <li>M. Martin a accueilli Lucas avec un sourire et lui a tendu la main pour le saluer. Pas de contact physique autre que la prise de main.</li>
    </ul>
  </li>
  <li>
    <strong>Activités (14h10):</strong>
    <ul>
      <li>M. Martin avait apporté un jeu de société. Ils se sont assis à une table et ont commencé à jouer.</li>
      <li>Lucas semblait concentré sur le jeu et souriait fréquemment. Il a posé quelques questions à son père sur les règles du jeu.</li>
      <li>M. Martin a fait preuve de patience et a pris le temps d'expliquer les règles à Lucas.</li>
    </ul>
  </li>
  <li>
    <strong>Discussion (14h40):</strong>
    <ul>
      <li>Après le jeu, ils ont discuté des activités scolaires de Lucas.</li>
      <li>M. Martin a posé des questions sur les amis de Lucas, ses matières préférées et ses hobbies.</li>
      <li>Lucas a parlé de son équipe de football à l'école et de son professeur de mathématiques.</li>
    </ul>
  </li>
  <li>
    <strong>Fin de la visite (15h00):</strong>
    <ul>
      <li>M. Martin a remis un petit cadeau à Lucas, un livre sur les dinosaures.</li>
      <li>Ils ont convenu de se voir lors de la prochaine visite supervisée.</li>
      <li>Lucas a quitté la pièce avec un sentiment général de contentement.</li>
    </ul>
  </li>
</ol>
<h2>Remarques générales:</h2>
<ul>
  <li>Tout au long de la visite, M. Martin a fait preuve de respect envers Lucas et a évité tout sujet de conversation potentiellement conflictuel.</li>
  <li>Lucas semblait à l'aise avec son père, bien qu'il y ait eu quelques moments de silence.</li>
  <li>Aucun signe de tension ou de malaise n'a été observé pendant la visite.</li>
</ul>
<h2>Recommandations:</h2>
<ul>
  <li>Poursuivre les visites supervisées dans le même cadre.</li>
  <li>Encourager M. Martin à continuer à apporter des activités ou des jeux pour faciliter l'interaction avec Lucas.</li>
  <li>Envisager, à long terme, d'augmenter la durée des visites si les prochaines se déroulent aussi bien.</li>
</ul>



`))




export const notesList = {
  1: {
    id: 1,
    reference: 'N00001',
    title: 'Note 1',
    content: d,
    status: 'Brouillon',
    created: new Date().toLocaleDateString(),
    dossierId: 'F00001',
    eventId: 'Visite supervisée avec Lucas',
    author: "Jean Dupuis"

  },
  2: {
    id: 2,
    reference: 'N00002',
    title: 'Note 2',
    content: EditorState.createEmpty(),
    status: 'Approbation requise',
    created: new Date().toLocaleDateString(),
    dossierId: 'F00002',
    eventId: 'Visite supervisée avec Lucas',
    author: "Jean Dupuis"

  },
  3: {
    id: 3,
    reference: 'N00003',
    title: 'Note 3',
    content: EditorState.createEmpty(),
    status: 'Approuvée',
    created: new Date().toLocaleDateString(),
    dossierId: 'F00003',
    eventId: 'Visite supervisée avec Lucas',
    author: "Jean Dupuis"

  },
  4: {
    id: 4,
    reference: 'N00004',
    title: 'Note 4',
    content: EditorState.createEmpty(),
    status: 'Rejetée',
    created: new Date().toLocaleDateString(),
    dossierId: 'F00004',
    eventId: 'Visite supervisée avec Lucas',
    author: "Jean Dupuis"
  },
};

