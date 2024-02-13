#!/bin/bash



export PS1="\[$(tput setaf 33)\]\u\[$(tput setaf 69)\]@\[$(tput setaf 105)\]\h \[$(tput setaf 141)\]\w \[$(tput sgr0)\]$ "

export BUN_INSTALL="$HOME/.bun"
export PATH=$BUN_INSTALL/bin:$PATH
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
. "$HOME/.cargo/env"



alias gst='git status'


alias ps='procs'
alias l="ls -lahos --color=auto"
alias h='hx ${1}'
alias c='clear'
echo  ${1}
#docker
#docker rm -f $(docker ps -a -q) ; docker rmi $(docker images -a -q) ; docker compose up --force-recreate --build
alias cat='bat ${1}'
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
