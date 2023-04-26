# NFR node

|||
|---|---:|
|typ|nfr-node|
|wersja|2019.03|

| Numer      | Status | Treść wymagania           | Komentarz  |
| :---: | :---: |---| -----|
|0| ⚪ | Aplikacja najpóźniej przed pierwszym wdrożeniem lub w razie fundamentalnych zmian jest zweryfikowana pod kątem architektury, procesu deploymentu, bezpieczeństwa, integracji z Heimdallrem, Consulem, RabbitMQ, Prometheus-em, itp., oraz w/w wymagań przez Architektów, Zespół Wsparcia lub osoby przez nie wyznaczone.||
|1| ⚪ | Logi z części backendowej systemu są rejestrowane w ELK (Elasticsearch / Logstash / Kibana), logi z części klienckiej z użyciem centralnego serwera logów - Sentry.||
|2| ⚪ | System używa wspólnego mechanizmu uwierzytelniania i autoryzacji – Heimdallr. Jeżeli system wymaga autoryzacji, to jest ona oparta na claim'ach. W wyjątkowych sytuacjach dopuszczalny jest brak uwierzytelniania. ||
|3| ✔ | Proces budowania i deploymentu jest w pełni automatyczny w oparciu o TeamCity, Octopus, Jenkins i nie wymaga ręcznych akcji ani nie wymaga dostępu (np. logowanie się poprzez RDP czy ssh) do środowiska produkcyjnego. ||
|4| ⚪ | System jest skalowalny horyzontalnie. Działają przynajmniej 2 instancje systemu na różnych hostach. Instancje są gotowe by działać za HAProxy. Wszystkie te systemy są zarejestrowane w Consulu.||
|5| ⚪ | System zapewnia ciągłość działania usług np. poprzez redundancję komponentów hostowanych na różnych hostach w trybie active-active, brak sticky session. Ciągłość działania jest zapewniona także podczas deploymentu.||
|6| ⚪ | Hosty w ATM i OKTA, ich zasoby typu zużycie procesora, zajętość pamięci, zajętość dysku, stan podstawowych procesów są administrowane i monitorowane przez K2.||
|7| ⚪ | Systemy komunikujące się za pomocą interfejsów publicznych przez sieć Internet muszą używać protokołu HTTPS. Usługi udostępnione do Internetu są dostępne z zewnątrz po protokole HTTPS.||
|8| ⚪ | Systemy do komunikacji po http wykorzystują adresy dostarczone przez Consula lub HaProxy. Systemy nie używają wpisów w plikach hosts do rozwiązywania adresów.||
|9| ⚪ | Działanie komponentów jest sprawdzane po deploymencie przy użyciu smoke testów.||
|10| ⚪ | Zespół jest w stanie zmienić wszystkie poświadczenia systemu (nie dotyczy poświadczeń użytkowników) w tym client secret we współpracy z Zespołem Wsparcia w przeciągu 60 minut. Żadne hasła dostępowe ani dane wrażliwe nie mogą być przechowywane w kodzie źródłowym w repozytorium (z wyjątkiem poświadczeń na środowisko DEV), w logach. Poświadczenia nie mogą być dostępne/ulokowane w aplikacjach działających na urządzeniach użytkowników. Poświadczenia powinny się znajdować w Octopus i muszą być zamaskowane. Na środowiskach DEV-owych mogą być tylko poświadczenia DEV-owe.||
|11| ⚪ | Działanie produkcyjnych usług w OKTA i ATM jest monitorowane w CheckMK. Działanie produkcyjnych usług jest monitorowane w Prometheus-u niezależnie od infrastruktury.||
|12| ⚪ | Żaden z komponentów nie może działać w kontekście konta użytkownika. Powinien działać w kontekście systemowego użytkownika.||
|13|⚪| Aplikacja na produkcji posiada zminifikowany kod JS i CSS. ||
|14|⚪| Odświeżenie aplikacji w przeglądarce użytkownika odbywa się automatycznie, zawsze po wydaniu nowszej wersji np. poprzez odpowiedni zestaw nagłówków, wersjonowanie nazwy plików. ||
|15|⚪| Wszystkie środowiska produkcyjne i beta aplikacji webowej są dostępne wyłącznie przez https. ||
|16|✔| W kodzie wynikowym dostępnym dla użytkownika nie przechowujemy informacji o architekturze naszego środowiska (np. lokalne i testowe adresy url) i nie wypisujemy żadnych informacji do konsoli deweloperskiej (np. korzystając z console.log). ||
|17|✔| Nie przechowujemy po stronie klienta żadnych danych uwierzytelniających oprócz access token.||
|18|✔|W przypadku aplikacji posiadających testy automatyczne w kodzie wynikowym html, w miejscach podlegających testom, zawarte są oznaczenia niezbędne dla testów automatycznych np. data-test, data-is-ready.||
|19|✔|Aplikacja w pełni spełnia standard użyteczności WCAG na poziomie A i w dostępny, możliwy sposób spełnia poziom AA.||
|20|✔| W repozytorium znajduje się plik README wraz z wymaganiami technicznymi, opisem instalacji i uruchomienia, odnośnikami do uruchomionych instancji, podręcznikiem stylu dla kodu źródłowego, odnośnikami do wszystkich narzędzi wykorzystywanych w procesie budowania i dostarczania produktu (np. teamcity, azure devops, sonar, octopus). ||
|21|✔| Kod źródłowy jest analizowany statycznie, zarówno lokalnie, z użyciem linterów jak i centralnie. Nie możliwym jest wprowadzenie zmian w kodzie źródłowym, w gałęzi deweloperskiej lub głównej, na takie, które nie spełniają obowiązujących reguł. Sonar Quality Gate dla systemu ma status Passed ewentualnie Warning||
|22|✔| Projekt posiada zdefiniowany style guide, który jest sprawdzany automatycznie za pomocą analizy statycznej. ||
|23|✔|Zależności zewnętrzne wskazują konkretne wersje bibliotek i są automatycznie analizowane pod kątem bezpieczeństwa. Analiza nie zwraca błędów na poziomie *high* i wyższym.||
|24|✔|W procesie budowania projektu, w ramach analizy wprowadzanych zmian (pull request) udostępniane są informacje na temat stopnia pokrycia kodu źródłowego testami jednostkowymi, wyników analizy statycznej, rozmiaru i zawartości plików wynikowych, duplikatów w kodzie.||
|25|❌|Stopień pokrycia kodu źródłowego testami jednostkowymi wynosi conajmniej 30% w odniesieniu do instrukcji lub lini.||


## Legenda

| Ikona | Co oznacza       | Co w komentarzu  |
| :---: |---| -----|
| ✔ | wymaganie spełnione | ok |
| ⚪ | wymaganie nie dotyczy tego projektu | wyjaśnienie z jakich powodów te wymaganie nie dotyczy danego systemu|
| ❌ |wymaganie nie spełnione |wytłumaczenie co nie jest zrobione i jak to wygląda obecnie |
| ❔ | nie wiemy czy wymaganie jest spełnione| w trakcie weryfikacji |
