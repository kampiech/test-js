TODO

* discovery
  * rejestracja (DONE)
  * pobieranie adresu usługi (DONE)
  * niezależność od DC
* obsługa logów
  * podstawowe logowanie (DONE)
  * logowanie na poziomie req handlera (controllera?) (DONE)
  * niezależność od DC
* obsługa "zależnych" procesów (np rejestracja w consulu) i przychodzących połączeń (wait until blocked, queue blocking task etc) (DONE)
  * obsługa endpointów livness, probiness (DONE)
  * niezależność od DC (aka graceful shutdown) - (in progress)
* obsługa metryk dla prometeusza (DONE)
  * przykładowy dashboard
* pobieranie secretów Azure Key Vault na poziomie aplikacji (DONE)
* security
  * helmet (DONE)
  * csrf (in progress)
  * polityka CSP
* client credentials (oauth2)
* open tracing
* użycie części paczek w ramach np. Plateau (np packages/juno-discovery, packages/juno-metrics)
* obsługa zmiennych env przez KV (dotenv-vault?)
* implementacja zależności usługi dla Plateau - https://pracuj.atlassian.net/wiki/spaces/AI/pages/2988965909/Service+dependencies
* GET /service-apis
* usunac smieci z juno-metrics normalizePath
  Pytania
* czy aby napewno KV jest poczebny?

---

* overload protection toobusy ?
* wsparcie dla clinicjs ?
* conditional middlewares?
* local api gateway
* stream response


---
konsola developerska ala DJANGO_DEBUG_CONSOLE
http client - getService w miejsce getServiceAddress i zapytań
opentracing - jeager
metrics/ w cluster mode
cluster mode
cache w obsludze consula
wsparcie biblioteki debug w pino - tak aby mozna bylo wyciagnac tylko
