# Torneo Calcio a 5: guida di installazione

Tempo: circa 15-20 minuti. Costo: zero (piani gratuiti di Firebase e GitHub).

## Come funziona
- **Chi guarda** (gli amici): apre il link, nessun account, vede tutto in tempo reale.
- **Arbitro**: inserisce la password arbitri e può segnare gol, cartellini, formazioni, stato e note.
- **Organizzatore (tu)**: inserisce la password organizzatore e può fare tutto: squadre, giocatori, partite, cambiare la password arbitri, azzerare il torneo.
- Le password **non sono scritte nel codice**: stanno nel database e solo le regole di sicurezza le possono leggere.

## 1. Crea il progetto Firebase
1. Vai su https://console.firebase.google.com e accedi con il tuo account Google.
2. **Crea progetto** → nome a piacere (es. `torneo-calcetto`) → puoi disattivare Google Analytics.

## 2. Attiva il database
1. Menu **Build → Firestore Database → Crea database**.
2. Regione: `eur3 (europe-west)`. Modalità: **produzione**.

## 3. Attiva l'accesso anonimo
1. **Build → Authentication → Inizia**.
2. Scheda **Metodo di accesso → Anonimo → Abilita → Salva**.

(L'accesso anonimo serve solo a riconoscere il telefono di chi gestisce. Gli spettatori non lo usano.)

## 4. Incolla le regole di sicurezza
1. **Firestore Database → scheda Regole**.
2. Cancella tutto e incolla il contenuto del file `firestore.rules` → **Pubblica**.

## 5. Imposta la password organizzatore
1. **Firestore Database → scheda Dati → Avvia raccolta**.
2. ID raccolta: `config` → ID documento: `admin`.
3. Campo: `password` (tipo *stringa*), valore = la tua password organizzatore. Scegline una **lunga** (almeno 10 caratteri).
4. Salva.

Per cambiarla in futuro: stessa schermata, modifica il campo `password`. I vecchi accessi organizzatore decadono subito.

## 6. Collega la pagina al progetto
1. **Impostazioni progetto (icona ingranaggio) → Le tue app → icona Web `</>`**.
2. Nome app a piacere, **non** serve Firebase Hosting → Registra app.
3. Copia i valori di `firebaseConfig` e incollali nel file `firebase-config.js`, al posto di `INCOLLA_QUI`.

## 7. Pubblica su GitHub Pages
1. Su GitHub crea un repository nuovo, ad esempio `torneo` (pubblico).
2. Carica tutti i file di questa cartella (`index.html`, `firebase-config.js`, `manifest.json`, `sw.js`, le 3 icone). `firestore.rules` e questa guida sono facoltativi.
3. **Settings → Pages → Source: Deploy from a branch → Branch `main` / `(root)` → Save**.
4. Dopo un minuto il link è `https://salvatore1685.github.io/torneo/`: è quello da mandare agli amici.

## Primo uso
1. Apri il link, tocca **🔑 Accedi**, inserisci la password organizzatore.
2. **Squadre**: aggiungi squadre e giocatori. **Partite**: crea le partite.
3. **Gestione → Password arbitri**: scegli la password da dare agli arbitri.

## Installarla come app
- **Android (Chrome)**: menu ⋮ → *Installa app* / *Aggiungi a schermata Home*.
- **iPhone (Safari)**: tasto Condividi → *Aggiungi alla schermata Home*.
- Su iPhone l'app aggiunta alla Home ha dati separati da Safari: chi gestisce deve rifare l'accesso con la password la prima volta.

## Calendario automatico (Gestione → Calendario campionato)
- Dopo aver inserito le squadre, la pagina ti mostra i numeri di giornate che chiudono un campionato completo (con 4 squadre: 3, 6, 9, 12, 15, 18, 21...), con il totale delle partite.
- Scegli il numero e tocca **Genera calendario**: nascono tutte le partite, divise per giornata, con casa e trasferta che si alternano. Nella scheda Partite si sceglie la giornata da vedere (di default quella in corso).
- Si possono scegliere solo i numeri suggeriti, così tutte le squadre si sfidano lo stesso numero di volte.
- Per rifarlo: **Elimina calendario campionato** e poi rigenera.

## Stemmi e logo (solo organizzatore)
- **Squadre → Carica stemma** sotto ogni squadra: scegli l'immagine dalla galleria del telefono. Si apre una schermata per **inquadrarla** in un quadrato: trascina per spostare, cursore per ingrandire, **Intera** per vederla tutta, **Riempi** per riempire il riquadro. Poi **Salva stemma**. Non serve ridimensionare le foto prima. Meglio un PNG con sfondo trasparente.
- **Gestione → Logo del torneo**: stessa schermata di inquadratura degli stemmi (riquadro quadrato). Il logo compare in alto e il nome del torneo va sotto.
- Gli stemmi compaiono in classifica, partite, dettaglio partita, marcatori e nel riquadro del campione. Senza stemma c'è un cerchietto con l'iniziale.
- Le immagini si salvano nel database insieme ai dati: se non vuoi più usarle, "Rimuovi".

## Sfondo
- La pagina usa come sfondo fisso la foto `sfondo.jpg` (stadio di notte), uguale per tutte le schede. Se il file manca, compare uno sfondo disegnato di ripiego.
- Attenzione alla licenza: la foto che mi hai mandato è di PngTree e riporta la loro filigrana. Prima di pubblicare la pagina scarica la versione ufficiale senza filigrana dal sito (con l'attribuzione richiesta dalla licenza gratuita, oppure con abbonamento) e sostituisci `sfondo.jpg`.
- Per usare un tuo sfondo, salva l'immagine (senza scritte né loghi sopra) con il nome **sfondo.jpg** nella stessa cartella di `index.html` e caricala su GitHub. Viene scurita in automatico per mantenere leggibili testi e tabelle. Se il file non c'è, resta lo sfondo disegnato.
- Meglio un'immagine verticale (circa 1080×1920) e leggera, sotto i 500 KB.
- Aggiungi `sfondo.jpg` anche all'elenco `FILES` in `sw.js` se vuoi che si veda anche con rete lenta.

## Partite rinviate
- Dal dettaglio partita imposta lo stato **Rinviata**. Nel menu delle giornate compare "⚠ 1 da recuperare" e la giornata non risulta completata.
- Scrivi nelle **Note** quando si recupera: la nota si vede direttamente sotto la partita nell'elenco.
- Quando la partita si gioca, inserisci gol ed eventi e metti lo stato **Finita**: conta nella giornata originale.

## Date delle giornate e avvisi
- In **Partite**, scelta una giornata, l'organizzatore imposta la **data**. La dicitura "in corso" compare solo in quel giorno; la giornata mostrata di default è quella di oggi, altrimenti la prossima in calendario.
- Ogni volta che l'organizzatore inserisce o cambia una data, la pagina crea in automatico un **avviso** (es. "Giornata 3 spostata: da ven 20/11 a sabato 21 novembre").
- Chi ha la pagina aperta vede subito un messaggio; gli altri trovano un numerino rosso sulla campanella 🔔 in alto. Toccandola leggono gli avvisi.
- L'organizzatore può anche scrivere un **avviso libero** dalla campanella (es. "Domani si gioca alle 21:00").
- Attenzione: **non sono notifiche push** che arrivano a telefono bloccato o app chiusa. Per quelle servirebbe un servizio in più (vedi i messaggi con Claude).
- Ricorda di ripubblicare `firestore.rules` (nuova sezione per gli avvisi).

## Fase finale (scheda Finali)
- A campionato finito: **Finali → Genera semifinali e finale**. Le prime quattro della classifica si sfidano (1ª-4ª e 2ª-3ª) e le due vincitrici giocano la finale, che si compila da sola.
- Nel dettaglio partita si può scegliere l'evento **Rigore**: vale come gol per il risultato e per i marcatori, e compare come "⚽ (R)".
- A campionato finito (tutte le partite "Finita") la Classifica mostra la coppa con la squadra campione.
- Se una partita finisce in pareggio, nel dettaglio compare "Chi passa ai rigori?": va scelta da chi segna la partita.
- Le partite della fase finale non contano nella classifica del campionato; gol e cartellini invece entrano nella classifica marcatori.
- Se l'hai generata per errore: **Elimina fase finale** e la rigeneri.

## Nuovo torneo / cambio arbitri
- **Cambiare arbitri**: Gestione → nuova password arbitri. Tutti gli arbitri precedenti perdono l'accesso all'istante.
- **Nuovo torneo**: Gestione → scrivi `RESET` → *Azzera tutto*. Cancella squadre, giocatori, partite e gol; le password restano.

## Se qualcosa non va
- *"Database non configurato"*: manca la configurazione in `firebase-config.js`.
- *"Accesso anonimo non attivo"*: rifai il punto 3.
- *Errore sul dominio non autorizzato*: Authentication → Impostazioni → Domini autorizzati → aggiungi `salvatore1685.github.io`.
- *Password giusta ma "errata"*: controlla di aver pubblicato le regole (punto 4) e che il documento sia `config/admin` con campo `password`.
- Dopo aver aggiornato i file su GitHub, se non vedi le modifiche ricarica la pagina un paio di volte (c'è una cache).

## Sicurezza, in breve
- I valori in `firebase-config.js` non sono segreti; a proteggere i dati sono le regole del database.
- Le regole non possono limitare i tentativi di indovinare la password: usa password lunghe e non banali.
- Gli arbitri non possono creare/eliminare partite né toccare squadre e password: le regole lo impediscono anche se qualcuno modifica la pagina.

## Rinominare una squadra
Nella scheda **Squadre**, da organizzatore, il nome di ogni squadra è modificabile: tocca il nome, scrivi quello nuovo e conferma. Il cambio vale subito ovunque (calendario, classifica, marcatori) senza rifare nulla, e giocatori e stemma restano. Utile se prima dell'inizio una squadra si ritira e ne subentra un'altra.

## Campionato + Champions (due competizioni parallele)
In **Gestione** ci sono due calendari indipendenti con le stesse squadre: **Campionato** (finisce normalmente) e **🏆 Champions** (con numero di giornate scelto a parte e abbinamenti diversi). Ognuna ha la sua classifica, i suoi marcatori e le sue date delle giornate: in Classifica, Partite e Marcatori compare l'interruttore *Campionato / Champions* (solo dopo aver creato la Champions). Finite le giornate della Champions, la scheda **Finali** genera le semifinali (1ª-4ª e 2ª-3ª della classifica Champions) e la finale, con la vincitrice. Le regole Firestore non cambiano. Nota: nell'anteprima i vecchi dati restano valide, le partite già create contano come Campionato.

## Avvisi collegati alle giornate e orario
Nelle Partite, selezionando una giornata, l'organizzatore imposta **data e orario**: l'orario compare su tutte le partite di quella giornata (se la singola partita non ha il suo) e in una riga evidente per tutti. Ogni cambio invia un avviso già collegato alla giornata. Negli avvisi scritti a mano c'è la voce **Collega l'avviso a una giornata**. Chi tocca l'avviso (nell'elenco 🔔 o nel messaggio che compare all'arrivo) va direttamente alle partite di quella giornata, della competizione giusta (Campionato o Champions). Le regole Firestore non cambiano.

Aggiornamento: data e orario di una giornata si salvano senza avvisare nessuno; l'avviso parte solo quando tocchi **🔔 Invia avviso** (grigio e non cliccabile finché data e orario non sono impostati entrambi, poi diventa verde) (un solo avviso per data e ora insieme). Se poi cambi data o orario, il pulsante torna attivo e l'avviso dirà "spostata da … a …".
Il pulsante **Invia avviso** diventa verde appena data e orario sono entrambi compilati. Il pulsante **Cancella** accanto svuota data e orario di quella giornata (senza inviare avvisi) e riporta il pulsante allo stato iniziale.

## Vista Calendario e data/ora per singola partita
In **Partite** c'è un terzo interruttore, **📅 Calendario**, prima di Campionato e Champions: mostra insieme le partite di entrambe le competizioni **che hanno una data**, in ordine di data e ora, raggruppate per giorno. Le partite senza data non compaiono. La data di una partita è quella della sua giornata, oppure quella impostata sulla singola partita (aprila: *Data e orario di questa partita*, con **Invia avviso** e **Cancella** come per le giornate); la singola partita ha la precedenza. L'avviso di una singola partita porta, toccandolo, al Calendario.
Dopo aver inviato un avviso libero dalla campanella, la finestra si chiude e sulla campanella compare il numero, come sugli altri dispositivi.

## Riquadri per giornata e colori Champions
In Calendario, Campionato e Champions ogni giornata ha il suo riquadro con titolo e data/ora, e dentro le sue partite (in Calendario i riquadri sono in ordine di data). Le partite e i riquadri della Champions (comprese semifinali e finale) hanno uno sfondo blu, quelle del Campionato restano verdi.
Nel **Calendario**, se una singola partita ha una data diversa da quella della sua giornata, compare in un riquadro a parte (con lo stesso titolo, es. "Giornata 1") al posto giusto in ordine di data. La finestra di una partita di Champions usa la stessa palette blu dei riquadri.

## Chat (💬 accanto alla campanella)
Tutti possono leggere e scrivere (la prima volta scelgono un nome, salvato sul dispositivo). I messaggi di organizzatore e arbitri hanno l'etichetta. Il numero sul 💬 indica i messaggi nuovi. Ognuno può cancellare i propri messaggi; l'organizzatore può cancellare qualsiasi messaggio e **Disattivare/Attivare** la chat dalla finestra stessa. Si vedono gli ultimi 100 messaggi. **Ripubblica `firestore.rules`** in Firebase (c'è una nuova sezione `chat`). Attenzione: essendo aperta a tutti, non c'è un vero limite ai messaggi: se qualcuno esagera, disattiva la chat.

Tema blu Champions esteso: nelle schede Champions (Classifica, Partite, Marcatori, Finali, finestra della partita e riquadro del calendario Champions in Gestione) anche campi, menu e pulsanti sono blu. Resta verde solo il pulsante "Invia avviso".

## Cartoline da condividere
Pulsanti **🖼 Cartolina…** (per tutti, anche senza accesso): nella finestra di una partita (risultato con marcatori), sotto Classifica, sotto Marcatori, sotto la card del campione (Campionato e Champions), e in Partite scegliendo una giornata (**Cartoline della giornata**: riepilogo + una cartolina per partita, massimo 10). Si apre l'anteprima con **Condividi** (menu di condivisione del telefono: WhatsApp, Instagram, Facebook…) e **Scarica**. Le immagini sono 1080×1350 e sono create sul telefono, senza server. Usano logo, stemmi e `sfondo.jpg`; verdi per il Campionato, blu per la Champions.
Le **Cartoline della giornata** ora comprendono, in coda, anche la **classifica** della stessa competizione (Campionato o Champions): riepilogo + una cartolina per partita (massimo 8) + classifica, per un massimo di 10 immagini.
