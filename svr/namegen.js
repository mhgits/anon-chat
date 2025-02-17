const syllables = [
  "a", "e", "i", "o", "u",
  "ba", "be", "bi", "bo", "bu",
  "ca", "ce", "ci", "co", "cu",
  "cha", "che", "chi", "cho", "chu",
  "da", "de", "di", "do", "du",
  "fa", "fe", "fi", "fo", "fu",
  "ga", "ge", "gi", "go", "gu",
  "ha", "he", "hi", "ho", "hu",
  "ja", "je", "ji", "jo", "ju",
  "ka", "ke", "ki", "ko", "ku",
  "la", "le", "li", "lo", "lu",
  "ma", "me", "mi", "mo", "mu",
  "na", "ne", "ni", "no", "nu",
  "pa", "pe", "pi", "po", "pu",
  "ra", "re", "ri", "ro", "ru",
  "sa", "se", "si", "so", "su",
  "sha", "she", "shi", "sho", "shu",
  "ta", "te", "ti", "to", "tu",
  "tha", "the", "thi", "tho", "thu",
  "va", "ve", "vi", "vo", "vu",
  "wa", "we", "wi", "wo", "wu",
  "xa", "xe", "xi", "xo", "xu",
  "ya", "ye", "yi", "yo", "yu",
  "za", "ze", "zi", "zo", "zu",
  "bla", "ble", "bli", "blo", "blu",
  "cla", "cle", "cli", "clo", "clu",
  "dra", "dre", "dri", "dro", "dru",
  "fra", "fre", "fri", "fro", "fru",
  "gra", "gre", "gri", "gro", "gru",
  "pla", "ple", "pli", "plo", "plu",
  "pra", "pre", "pri", "pro", "pru",
  "qua", "que", "qui", "quo", "quu",
  "sna", "sne", "sni", "sno", "snu",
  "spa", "spe", "spi", "spo", "spu",
  "sta", "ste", "sti", "sto", "stu",
  "tra", "tre", "tri", "tro", "tru",
  "ck", "ng", "ll"
];
const alphabet = "abcedfghijklmnopqrstuvwxyz";
function genid() {
  let n = Math.floor(Math.random() * 2) + 2;
  let w = "";
  for (let i = 0; i < n; i++) {
    w += syllables[Math.floor(Math.random() * syllables.length)];
  }
  if (Math.random() > 0.8) {
    w += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return w;
}
module.exports = genid;