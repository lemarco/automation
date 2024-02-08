#!/bin/bash

PROMPT_COMMAND='PS1_CMD1=$(git branch 2>/dev/null | grep '"'"'*'"'"' | colrm 1 2)'; PS1='\[\e[2m\]\d\[\e[0m\]|\[\e[2m\]\t\[\e[0m\]| git:${PS1_CMD1}| dir:\W\[\e[5m\]:\[\e[0m\] '

export BUN_INSTALL="$HOME/.bun"
export PATH=$BUN_INSTALL/bin:$PATH
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
. "$HOME/.cargo/env"


alias l="ls -lahs --color=auto"
alias h='hx ${1}'
alias c='clear'
echo  ${1}
#docker
#docker rm -f $(docker ps -a -q) ; docker rmi $(docker images -a -q) ; docker compose up --force-recreate --build

alias psp='docker system prune -a'
alias dim='bun ~/.config/automation/auto.ts docker images'
alias dcs='bun ~/.config/automation/auto.ts docker compose-start ${1}'
alias dcd='bun ~/.config/automation/auto.ts docker compose-down ${1}'
alias dcl='bun ~/.config/automation/auto.ts docker compose-logs ${1}'
alias dps='bun  ~/.config/automation/auto.ts docker ps'
alias dkill='bun  ~/.config/automation/auto.ts docker kill ${1}'
alias dfkill='bun ~/.config/automation/auto.ts docker fkill ${1}'
alias dres='bun  ~/.config/automation/auto.ts docker restart ${1}'
#requests
alias get='bun  ~/.config/automation/auto.ts get ${1}'
alias post='bun  ~/.config/automation/auto.ts post ${1} ${2} ${3}'
alias put='bun  ~/.config/automation/auto.ts put ${1} ${2} ${3}'
alias delete='bun  ~/.config/automation/auto.ts delete ${1} ${2} ${3}'
