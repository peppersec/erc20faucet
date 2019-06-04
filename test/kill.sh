    
#!/bin/bash
kill $(ps aux | grep 'ganache-cli' | awk '{print $2}')
#kill $(ps aux | grep 'nuxt' | awk '{print $2}')